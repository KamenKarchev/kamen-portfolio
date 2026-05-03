// nemotry.js (debug-friendly allocator)
import { point, box } from '@flatten-js/core';
import { EN_PROJECTS } from '../data/content.js';

/**
 * @typedef {{ id: string; value: number }} ProjectConcept
 */

/**
 * @typedef {{ id: string; area: number }} ProjectBlueprint
 */

/**
 * @typedef {{
 *   id: string;
 *   height: number;
 *   width: number;
 *   startx: number;
 *   starty: number;
 * }} ProjectCard
 */

/**
 * @typedef {{
 *   id: string;
 *   area: number;
 *   type: 'real' | 'potential';
 *   segments?: SpaceSegment[];
 * }} Candidate
 */

/**
 * @typedef {{
 *   card: ProjectCard;
 *   mode: 'BUY' | 'SELL';
 *   desiredArea: number;
 *   actualArea: number;
 *   diff: number; // actual - desired
 *   overlay?: {
 *     type: 'buy' | 'sell';
 *     x: number;
 *     y: number;
 *     width: number;
 *     height: number;
 *   };
 * }} AllocationStep
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const ASPECT = 1.5;           // width : height ratio for cards
const MARGIN_WINDOW = 0.1;    // 10% match tolerance
const RECT_EPSILON = 1e-6;    // float tolerance

// ─── Geometry primitives ─────────────────────────────────────────────────────

class SpaceSegment {
  /**
   * @param {string} id
   * @param {import('@flatten-js/core').Box} segmentBox
   * @param {string[]} mergeOptionIds
   */
  constructor(id = '0', segmentBox, mergeOptionIds = []) {
    this.id = id;
    this.box = segmentBox;
    this.mergeOptionIds = mergeOptionIds;
  }

  getStart()          { return point(this.box.xmin, this.box.ymin); }
  getWidth()          { return this.box.width; }
  getHeight()         { return this.box.height; }
  getArea()           { return this.box.width * this.box.height; }
  getSegment()        { return this.box; }
  getMergeOptionIds() { return this.mergeOptionIds; }
}

/**
 * Owns all geometry for the canvas partition.
 * Handles cuts, merges, and neighbor wiring.
 */
class Space {
  /** @type {SpaceSegment[]} */
  segments = [];

  constructor(baseWidth, baseHeight) {
    this.baseWidth  = baseWidth;
    this.baseHeight = baseHeight;
    this.base       = box(0, 0, baseWidth, baseHeight);
    this.segments.push(new SpaceSegment('0', this.base, []));
  }

  getBaseWidth()  { return this.baseWidth; }
  getBaseHeight() { return this.baseHeight; }

  /**
   * @param {string[]} segmentIds
   * @returns {SpaceSegment[]}
   */
  getSegmentsByIds(segmentIds) {
    const set = new Set(segmentIds);
    return this.segments.filter((s) => set.has(s.id));
  }

  rangesOverlap(aMin, aMax, bMin, bMax, strict = true) {
    return strict
      ? Math.max(aMin, bMin) < Math.min(aMax, bMax)
      : Math.max(aMin, bMin) <= Math.min(aMax, bMax);
  }

  /**
   * @param {{ box: import('@flatten-js/core').Box }} a
   * @param {{ box: import('@flatten-js/core').Box }} b
   */
  detectNeighborRelation(a, b) {
    const A = a.box;
    const B = b.box;

    const left   = A.xmin === B.xmax && this.rangesOverlap(A.ymin, A.ymax, B.ymin, B.ymax);
    const right  = A.xmax === B.xmin && this.rangesOverlap(A.ymin, A.ymax, B.ymin, B.ymax);
    const top    = A.ymin === B.ymax && this.rangesOverlap(A.xmin, A.xmax, B.xmin, B.xmax);
    const bottom = A.ymax === B.ymin && this.rangesOverlap(A.xmin, A.xmax, B.xmin, B.xmax);

    return { left, right, top, bottom, touching: left || right || top || bottom };
  }

  /**
   * Split the segment containing (x, y) into 4 segments.
   * Returns the TL segment.
   * @param {number} x
   * @param {number} y
   * @returns {SpaceSegment | null}
   */
  cut(x, y) {
    const p = point(x, y);

    for (let i = 0; i < this.segments.length; i++) {
      const segment = this.segments[i];
      if (!segment.box.contains(p)) continue;

      const next = this.cutSegment(segment, x, y);
      if (!next) return null;

      this.segments.splice(i, 1, ...next);
      return next[0];
    }

    return null;
  }

  /**
   * Split one segment at (x, y) into four axis-aligned rectangles.
   * @param {SpaceSegment} segment
   * @param {number} x
   * @param {number} y
   * @returns {SpaceSegment[] | null}
   */
  cutSegment(segment, x, y) {
    const { xmin, ymin, xmax, ymax } = segment.box;

    if (x <= xmin || x >= xmax || y <= ymin || y >= ymax) {
      return null;
    }

    const id = segment.id;
    const tl = new SpaceSegment(id,             box(xmin, ymin, x,    y),    []);
    const tr = new SpaceSegment(id + '1',       box(x,    ymin, xmax, y),    []);
    const bl = new SpaceSegment(id + '2',       box(xmin, y,    x,    ymax), []);
    const br = new SpaceSegment(id + '3',       box(x,    y,    xmax, ymax), []);

    const pool = this.segments.concat([tl, tr, bl, br]);
    this.newNeighbours(tl.box, tl.id, pool);
    this.newNeighbours(tr.box, tr.id, pool);
    this.newNeighbours(bl.box, bl.id, pool);
    this.newNeighbours(br.box, br.id, pool);

    return [tl, tr, bl, br];
  }

  /**
   * @param {import('@flatten-js/core').Box} relocatedBox
   * @param {string} relocatedId
   * @param {SpaceSegment[]} segments
   */
  newNeighbours(relocatedBox, relocatedId, segments) {
    const cell = { box: relocatedBox };

    const neighbors = segments.filter(
      (other) =>
        other.id !== relocatedId &&
        this.detectNeighborRelation(cell, other).touching
    );

    const relocated = segments.find((s) => s.id === relocatedId);
    if (!relocated) return;

    relocated.mergeOptionIds = neighbors.map((n) => n.id);

    for (const n of neighbors) {
      if (!n.mergeOptionIds.includes(relocatedId)) {
        n.mergeOptionIds.push(relocatedId);
      }
    }
  }

  /**
   * @param {{x:number,y:number}} start
   * @param {{x:number,y:number}} end
   * @returns {SpaceSegment | null}
   */
  pack(start, end) {
    const region = box(
      Math.min(start.x, end.x), Math.min(start.y, end.y),
      Math.max(start.x, end.x), Math.max(start.y, end.y)
    );

    const inside = this.segments.filter((s) => region.contains(s.box));
    if (inside.length === 0) return null;
    if (inside.length === 1) return inside[0];
    return this.mergeSegments(inside);
  }

  /**
   * @param {SpaceSegment[]} segments
   * @returns {SpaceSegment | null}
   */
  mergeSegments(segments) {
    if (!segments.length) return null;
    if (segments.length === 1) return segments[0];

    const parentIds = new Set(segments.map((s) => s.id));
    const mergedBox = segments.map((s) => s.box).reduce((acc, b) => acc.merge(b));

    const tlSeg = segments.reduce(
      (best, s) =>
        !best ||
        s.box.low.y < best.box.low.y ||
        (s.box.low.y === best.box.low.y && s.box.low.x < best.box.low.x)
          ? s
          : best,
      null
    );
    const newId = tlSeg.id;

    const graphNeighborIds = new Set(
      segments.flatMap((s) => s.mergeOptionIds.filter((id) => !parentIds.has(id)))
    );

    this.segments = this.segments.filter((s) => !parentIds.has(s.id));
    for (const s of this.segments) {
      s.mergeOptionIds = s.mergeOptionIds.filter((id) => !parentIds.has(id));
    }

    const geomNeighborIds = this.segments
      .filter((o) => this.detectNeighborRelation({ box: mergedBox }, o).touching)
      .map((g) => g.id);

    const mergedOptionIds = [...new Set([...graphNeighborIds, ...geomNeighborIds])];

    const merged = new SpaceSegment(newId, mergedBox, mergedOptionIds);
    this.segments.push(merged);

    for (const nid of mergedOptionIds) {
      const n = this.segments.find((s) => s.id === nid);
      if (n && !n.mergeOptionIds.includes(newId)) {
        n.mergeOptionIds.push(newId);
      }
    }

    return merged;
  }
}

// ─── Content parsing ──────────────────────────────────────────────────────────

/**
 * @param {Array<{ id: string; value: number }>} items
 * @returns {ProjectConcept[]}
 */
function parseContent(items) {
  return items.map((p) => ({ id: p.id, value: p.value }));
}

/**
 * @param {ProjectConcept[]} concepts
 * @param {number} totalArea
 * @returns {ProjectBlueprint[]}
 */
function conceptsToBlueprints(concepts, totalArea) {
  const totalValue =
    concepts.reduce((acc, c) => acc + (typeof c.value === 'number' ? c.value : 0), 0) || 1;

  return concepts.map((c) => ({
    id: c.id,
    area: (c.value / totalValue) * totalArea,
  }));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function bucketArea(area) {
  return Math.round(area);
}

/**
 * Unified credit update.
 * @param {number} credit
 * @param {number} actual
 * @param {number} desired
 */
function applyCredit(credit, actual, desired) {
  return credit - (actual - desired);
}

/** SELL (green) overlay inside card */
function makeSellOverlay(card, diffMagnitude) {
  const targetArea = diffMagnitude;
  if (targetArea <= 0) return undefined;

  let w = Math.sqrt(targetArea / ASPECT);
  let h = w * ASPECT;

  w = Math.min(w, card.width);
  h = Math.min(h, card.height);

  const x = card.startx + (card.width - w) / 2;
  const y = card.starty + (card.height - h) / 2;

  return {
    type: 'sell',
    x,
    y,
    width: w,
    height: h,
  };
}

/** BUY (red) overlay adjacent to TL card inside original segment */
function makeBuyOverlay(card, diffMagnitude, segmentBox) {
  const extraArea = diffMagnitude;
  if (extraArea <= 0) return undefined;

  let w = Math.sqrt(extraArea / ASPECT);
  let h = w * ASPECT;

  const segWidth  = segmentBox.xmax - segmentBox.xmin;
  const segHeight = segmentBox.ymax - segmentBox.ymin;

  h = Math.min(h, segHeight);
  w = Math.min(w, segWidth - (card.startx - segmentBox.xmin) - card.width);

  let x = card.startx + card.width;
  let y = card.starty;

  if (w <= 0 || x + w > segmentBox.xmax) {
    w = Math.min(w, segWidth);
    h = Math.min(h, segHeight - (card.starty - segmentBox.ymin) - card.height);
    x = segmentBox.xmin;
    y = card.starty + card.height;
  }

  if (w <= 0 || h <= 0) return undefined;

  return {
    type: 'buy',
    x,
    y,
    width: w,
    height: h,
  };
}

// ─── SpaceAllocator ───────────────────────────────────────────────────────────

class SpaceAllocator {
  /**
   * @param {Space} space
   * @param {ProjectBlueprint[]} blueprints
   */
  constructor(space, blueprints) {
    this.space      = space;
    this.blueprints = [...blueprints];
    this.credit     = 0;

    this.marginWindow = MARGIN_WINDOW;
    this.minaProjectArea = 0;

    /** @type {Map<number, string[]>} */
    this.segmentMarket = new Map();
    /** @type {Map<string, string[]>} */
    this.potentialIds = new Map();
    /** @type {Set<string>} */
    this.allocatedIds = new Set();

    this._init();
  }

  _init() {
    this.minaProjectArea =
      this.blueprints.reduce(
        (min, b) => (min == null ? b.area : Math.min(min, b.area)),
        null
      ) ?? 0;

    this._rebuildSegmentMarket();
  }

  /** BUY when credit < 0, SELL otherwise (including 0) */
  get mode() {
    return this.credit < 0 ? 'BUY' : 'SELL';
  }

  _rebuildSegmentMarket() {
    this.segmentMarket.clear();
    this.potentialIds.clear();

    for (const seg of this.space.segments) {
      if (this.allocatedIds.has(seg.id)) continue;
      this._addRealToMarket(seg);
    }
  }

  _removeFromMarket(id) {
    for (const [bucket, ids] of this.segmentMarket.entries()) {
      const next = ids.filter((x) => x !== id);
      if (next.length !== ids.length) {
        if (next.length === 0) this.segmentMarket.delete(bucket);
        else this.segmentMarket.set(bucket, next);
        return;
      }
    }
  }

  _addRealToMarket(segment) {
    if (this.allocatedIds.has(segment.id)) return;
    const bucket = bucketArea(segment.getArea());
    if (!this.segmentMarket.has(bucket)) this.segmentMarket.set(bucket, []);
    this.segmentMarket.get(bucket).push(segment.id);
  }

  _updateSegmentMarket() {
    this._rebuildSegmentMarket();
    this.mergePotential();
  }

  /**
   * Discover pairwise rectangular potential merges.
   */
  mergePotential() {
    this.potentialIds.clear();

    // Clean old potentials from market
    for (const [bucket, ids] of this.segmentMarket.entries()) {
      const next = ids.filter((id) => !id.startsWith('p-'));
      if (next.length === 0) this.segmentMarket.delete(bucket);
      else this.segmentMarket.set(bucket, next);
    }

    for (const s of this.space.segments) {
      if (this.allocatedIds.has(s.id)) continue;

      for (const nid of s.mergeOptionIds) {
        if (this.allocatedIds.has(nid)) continue;
        const n = this.space.segments.find((x) => x.id === nid);
        if (!n) continue;

        if (s.id >= n.id) continue;

        const mergedBox  = s.box.merge(n.box);
        const mergedArea = mergedBox.width * mergedBox.height;
        const areaSum    = s.getArea() + n.getArea();

        if (Math.abs(mergedArea - areaSum) >= RECT_EPSILON) continue;

        const potentialId = `p-${s.id}-${n.id}`;
        this.potentialIds.set(potentialId, [s.id, n.id]);

        const bucket = bucketArea(mergedArea);
        if (!this.segmentMarket.has(bucket)) this.segmentMarket.set(bucket, []);
        const bucketList = this.segmentMarket.get(bucket);
        if (!bucketList.includes(potentialId)) bucketList.push(potentialId);
      }
    }
  }

  /**
   * @param {ProjectBlueprint} blueprint
   * @returns {{ bigger: Candidate | null; smaller: Candidate[] }}
   */
  candidateSegments(blueprint) {
    const projectArea = blueprint.area;
    const margin      = projectArea * this.marginWindow;

    /** @type {Candidate[]} */
    const candidates = [];

    for (const seg of this.space.segments) {
      if (this.allocatedIds.has(seg.id)) continue;
      candidates.push({ id: seg.id, area: seg.getArea(), type: 'real' });
    }

    for (const [pid, realIds] of this.potentialIds.entries()) {
      const segs = this.space.getSegmentsByIds(realIds);
      if (segs.some((s) => this.allocatedIds.has(s.id))) continue;
      const area = segs.reduce((acc, s) => acc + s.getArea(), 0);
      candidates.push({ id: pid, area, type: 'potential', segments: segs });
    }

    const perfect = candidates.find((c) => Math.abs(c.area - projectArea) <= margin);
    if (perfect) return { bigger: perfect, smaller: [] };

    const smaller = [];
    let bestBigger = null;

    for (const c of candidates) {
      if (c.area < projectArea) {
        smaller.push(c);
      } else if (!bestBigger || c.area < bestBigger.area) {
        bestBigger = c;
      }
    }

    return { bigger: bestBigger, smaller };
  }

  _allocate(segment, blueprint) {
    this.allocatedIds.add(segment.id);
    this._removeFromMarket(segment.id);

    const start = segment.getStart();
    const area  = segment.getArea();

    let w = Math.sqrt(area / ASPECT);
    let h = w * ASPECT;

    if (w > segment.getWidth() || h > segment.getHeight()) {
      w = segment.getWidth();
      h = Math.min(area / w, segment.getHeight());
    }

    return {
      id: blueprint.id,
      width: w,
      height: h,
      startx: start.x,
      starty: start.y,
    };
  }

  _mergeCandidate(candidate) {
    if (candidate.type === 'real') {
      return this.space.segments.find((s) => s.id === candidate.id) ?? null;
    }

    const realIds = this.potentialIds.get(candidate.id) ?? [];
    const segs    = candidate.segments ?? this.space.getSegmentsByIds(realIds);
    if (!segs.length) return null;

    for (const s of segs) this._removeFromMarket(s.id);
    this._removeFromMarket(candidate.id);
    this.potentialIds.delete(candidate.id);

    const merged = this.space.mergeSegments(segs);
    if (merged) this._addRealToMarket(merged);
    return merged;
  }

  _computeCutPoint(segment, blueprint) {
    const { xmin, ymin, xmax, ymax } = segment.box;

    let w = Math.sqrt(blueprint.area / ASPECT);
    let h = w * ASPECT;

    if (w > xmax - xmin || h > ymax - ymin) {
      w = xmax - xmin;
      h = Math.min(blueprint.area / w, ymax - ymin);
    }

    return { x: xmin + w, y: ymin + h };
  }

  /**
   * @param {SpaceSegment} segment
   * @param {ProjectBlueprint} blueprint
   * @returns {AllocationStep}
   */
  _allocateWithCut(segment, blueprint) {
    const { x, y } = this._computeCutPoint(segment, blueprint);
    const tl = this.space.cut(x, y);

    const target = tl ?? segment;
    const card   = this._allocate(target, blueprint);

    const actual  = target.getArea();
    const desired = blueprint.area;
    const diff    = actual - desired;

    this.credit = applyCredit(this.credit, actual, desired);
    this._updateSegmentMarket();

    const mode = this.mode;

    let overlay;
    if (diff > 0) {
      overlay = makeBuyOverlay(card, diff, segment.box);
    } else if (diff < 0) {
      overlay = makeSellOverlay(card, -diff);
    }

    return { card, mode, desiredArea: desired, actualArea: actual, diff, overlay };
  }

  /**
   * @param {ProjectBlueprint} blueprint
   * @returns {AllocationStep | null}
   */
  allocateBlueprint(blueprint) {
    this.mergePotential();

    const { bigger, smaller } = this.candidateSegments(blueprint);

    const largestSmaller = smaller.length
      ? smaller.reduce((best, c) => (c.area > best.area ? c : best))
      : null;

    let chosen = null;
    if (this.mode === 'SELL') {
      chosen = largestSmaller ?? bigger;
    } else {
      chosen = bigger ?? largestSmaller;
    }

    if (!chosen) return null;

    const segment = this._mergeCandidate(chosen);
    if (!segment) return null;

    if (segment.getArea() >= blueprint.area) {
      return this._allocateWithCut(segment, blueprint);
    }

    const card   = this._allocate(segment, blueprint);
    const actual = segment.getArea();
    const desired = blueprint.area;
    const diff   = actual - desired;

    this.credit = applyCredit(this.credit, actual, desired);
    this._updateSegmentMarket();

    const mode = this.mode;

    let overlay;
    if (diff > 0) {
      overlay = makeBuyOverlay(card, diff, segment.box);
    } else if (diff < 0) {
      overlay = makeSellOverlay(card, -diff);
    }

    return { card, mode, desiredArea: desired, actualArea: actual, diff, overlay };
  }
}

// ─── Public APIs ──────────────────────────────────────────────────────────────

/**
 * Production API: only cards.
 * @param {number} widthConstraint
 * @param {number} heightConstraint
 * @param {Array<{ id: string; value: number }>} [projectItems]
 * @returns {ProjectCard[]}
 */
export function getProjectCards(widthConstraint, heightConstraint, projectItems = EN_PROJECTS) {
  const space      = new Space(widthConstraint, heightConstraint);
  const totalArea  = widthConstraint * heightConstraint;
  const blueprints = conceptsToBlueprints(parseContent(projectItems), totalArea);

  blueprints.sort((a, b) => b.area - a.area);

  const allocator = new SpaceAllocator(space, blueprints);
  const cards     = [];

  for (const blueprint of blueprints) {
    const step = allocator.allocateBlueprint(blueprint);
    if (step) cards.push(step.card);
  }

  return cards;
}

/**
 * Debug API: chronological allocation steps with BUY/SELL overlays.
 * @param {number} widthConstraint
 * @param {number} heightConstraint
 * @param {Array<{ id: string; value: number }>} [projectItems]
 * @returns {AllocationStep[]}
 */
export function getProjectSteps(widthConstraint, heightConstraint, projectItems = EN_PROJECTS) {
  const space      = new Space(widthConstraint, heightConstraint);
  const totalArea  = widthConstraint * heightConstraint;
  const blueprints = conceptsToBlueprints(parseContent(projectItems), totalArea);

  blueprints.sort((a, b) => b.area - a.area);

  const allocator = new SpaceAllocator(space, blueprints);
  const steps     = [];

  for (const blueprint of blueprints) {
    const step = allocator.allocateBlueprint(blueprint);
    if (step) steps.push(step);
  }

  return steps;
}