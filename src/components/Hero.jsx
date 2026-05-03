import { motion as Motion } from 'motion/react'

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: .7, ease: [.16, 1, .3, 1] } },
}

export default function Hero({ copy }) {
  return (
    <section className="hero-grid" id="hero">
      <Motion.article
        className="hero-copy glass"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: .15 }}
      >
        <span className="smallcaps">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
        <div className="hero-actions">
          <Motion.a className="btn btn-primary" href="#feature" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
            {copy.actions.feature}
          </Motion.a>
          <Motion.a className="btn btn-secondary" href="#projects" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
            {copy.actions.projects}
          </Motion.a>
          <Motion.a className="btn btn-secondary" href="#contact" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
            {copy.actions.contact}
          </Motion.a>
        </div>
        <div className="quick-grid">
          {copy.quickCards.map(c => (
            <div className="quick-card" key={c.label}>
              <strong>{c.label}</strong>
              <span>{c.value}</span>
            </div>
          ))}
        </div>
      </Motion.article>

      <Motion.aside
        className="hero-side glass"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: .15 }}
        transition={{ delay: .12 }}
      >
        <div className="portrait">
          <img src="/images/portrait-kamen-karchev.png" alt={copy.portraitAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className="caption">
            <strong>{copy.portraitName}</strong>
            <span>{copy.portraitMeta}</span>
          </div>
        </div>
        <div className="pull-quote">
          {copy.pullQuote}
        </div>
      </Motion.aside>
    </section>
  )
}
