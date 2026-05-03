# KSL — Kamen Structured Language (UPL - v0.1beta)

A lightweight prompt syntax for communicating structured intent to AI models.
Designed to be readable by both humans and models without a parser.

---

## Core Syntax

### Atom / Constant
```
<name> = <value>
```
Holds a single value. For multi-line values use `{}`:
```
<name> = {
  multi
  line
  value
}
```

### Operation
```
<operation>:<label> = { <value> }
```
- `operation` — determines how the block is interpreted (see keywords below)
- `label` — identifier for this block, used for cross-referencing
- `value` — content of the block; can be prose, nested operations, or atoms

### Referencing
Any block can reference another by its label inline:
```
context: c1
context: this project, c1, task: 1
```
Means: inherit the content of those labeled blocks as context.

### Nesting
Operations nest freely. Each level narrows the scope of what's inside it:
```
scope: X = {
  goal: Y = {
    actual instructions
  }
}
```

---

## Keywords (Meta-Operations)

| Keyword | Meaning |
|---|---|
| `task` | A discrete unit of work. Numbered for sequencing (`task: 1`, `task: 2`). |
| `context` | Declares what background knowledge applies to this block. Can reference other labeled blocks. |
| `scope` | Defines the boundary of what is and isn't affected by this task/goal. |
| `goal` | A named objective within a scope. One scope can have multiple goals. |
| `remember` | A constraint or fact the model must not forget or override during execution. |

Keywords are self-explanatory by name — they do not require verbose definitions to be understood.

---

## Example

```
c1 = {
  background information or context block
}

task: 1 = {
  context: this project, c1 {
    scope: what is being changed {
      goal: first objective {
        instructions...
        remember: important constraint
      }
      goal: second objective {
        instructions...
      }
    }
  }
}

task: 2 = {
  context: this project, c1, task: 1 {
    scope: what is being changed {
      goal: objective {
        instructions...
      }
    }
  }
}
```

---

## Rules

1. `{}` is always optional for single-line values, required for multi-line
2. Labels after `:` are free-text identifiers — numbers, words, or phrases
3. Cross-references are resolved by label match — order in the document does not matter
4. Prose inside `{}` is valid body content — no special formatting required
5. Nesting depth is unlimited but should reflect actual dependency
6. `task: N` implies sequential dependency unless stated otherwise
