import { motion as Motion } from 'motion/react'

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

export default function Masthead({ copy }) {
  return (
    <Motion.section
      className="masthead"
      variants={fade}
      initial="hidden"
      animate="show"
      transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
    >
      <div className="masthead-top">
        <aside className="masthead-meta">
          <span className="smallcaps">{copy.left[0]}</span>
          <span>{copy.left[1]}</span>
          <span>{copy.left[2]}</span>
        </aside>
        <h1 className="paper-title">{copy.title}</h1>
        <aside className="masthead-meta" style={{ textAlign: 'right' }}>
          <span className="smallcaps">{copy.right[0]}</span>
          <span>{copy.right[1]}</span>
          <span>{copy.right[2]}</span>
        </aside>
      </div>
      <div className="masthead-bottom">
        {copy.bottom.map((item) => <span key={item}>{item}</span>)}
      </div>
    </Motion.section>
  )
}
