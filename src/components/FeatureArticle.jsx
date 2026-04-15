import { motion } from 'motion/react'
import { TIMELINE } from '../data/content'

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: .6, ease: [.16, 1, .3, 1] } },
}
const stagger = { show: { transition: { staggerChildren: .12 } } }

function CheckpointCard({ cp }) {
  return (
    <motion.div className="checkpoint-card" variants={item}>
      <div className="checkpoint-img">
        {cp.image && <img src={cp.image} alt={cp.title} />}
      </div>
      <div className="checkpoint-label">
        <span className="smallcaps">{cp.year}</span>
        <h4>{cp.title}</h4>
        <p>{cp.body}</p>
      </div>
    </motion.div>
  )
}

export default function FeatureArticle() {
  return (
    <motion.section
      className="glass feature-article-shell"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
      viewport={{ once: true, amount: .1 }}
    >
      <div className="article-pad feature-article-pad">
        <div className="article-head">
          <span className="smallcaps">Headline feature</span>
          <h3 className="article-title">Start with the voice, then show the path that built it.</h3>
          <p className="article-deck">
            This section opens with a short video introduction, then expands into the story behind
            my technical direction, creative background, and growth over time.
          </p>
        </div>

        {/* Video — always full-width on top */}
        <div className="feature-video-wrap">
          <div className="video-frame">
            <button className="play-btn" aria-label="Play video">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <div className="caption">
              <strong>Video portfolio</strong>
              <span>A short introduction covering who I am, what I build, and where I want to go next.</span>
            </div>
          </div>
          <p className="feature-body-copy">I did not arrive at software from one straight line; I came through curiosity, media work, and then deeper technical focus.</p>
        </div>

        {/* Timeline — horizontal scroll, full-width, always visible */}
        <div className="timeline-section">
          <div className="timeline-section-head">
            <span className="smallcaps">Timeline</span>
            <div className="rule" />
          </div>
          <div className="timeline-scroll-wrap">
            <motion.div
              className="timeline-scroll"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: .1 }}
            >
              {TIMELINE.map((cp, i) => (
                <div className="timeline-col" key={cp.year}>
                  <div className="timeline-spine-h" aria-hidden="true">
                    {i > 0 && <div className="tl-line-h tl-line-h--before" />}
                    <div className="tl-dot" />
                    {i < TIMELINE.length - 1 && <div className="tl-line-h tl-line-h--after" />}
                  </div>
                  <CheckpointCard cp={cp} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
