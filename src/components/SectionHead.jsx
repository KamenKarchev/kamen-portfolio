import { motion as Motion } from 'motion/react'

export default function SectionHead({ eyebrow, title, id }) {
  return (
    <Motion.div
      className="section-head"
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .6, ease: [.16, 1, .3, 1] }}
      viewport={{ once: true, amount: .5 }}
    >
      <span className="smallcaps">{eyebrow}</span>
      <div className="rule" />
      <h3>{title}</h3>
      <div className="rule" />
    </Motion.div>
  )
}
