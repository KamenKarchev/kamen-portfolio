import { motion } from 'motion/react'
import { QUICK_CARDS } from '../data/content'

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: .7, ease: [.16, 1, .3, 1] } },
}

export default function Hero() {
  return (
    <section className="hero-grid" id="hero">
      <motion.article
        className="hero-copy glass"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: .15 }}
      >
        <span className="smallcaps">Front page</span>
        <h2>Backend engineer in progress, editorial thinker by instinct.</h2>
        <p>I build software with a systems mindset, a strong visual sense, and a growing focus on reliable backend architecture.</p>
        <div className="hero-actions">
          <motion.a className="btn btn-primary" href="#feature" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
            Watch and read
          </motion.a>
          <motion.a className="btn btn-secondary" href="#projects" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
            Open projects
          </motion.a>
          <motion.a className="btn btn-secondary" href="#contact" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}>
            Contact
          </motion.a>
        </div>
        <div className="quick-grid">
          {QUICK_CARDS.map(c => (
            <div className="quick-card" key={c.label}>
              <strong>{c.label}</strong>
              <span>{c.value}</span>
            </div>
          ))}
        </div>
      </motion.article>

      <motion.aside
        className="hero-side glass"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: .15 }}
        transition={{ delay: .12 }}
      >
        <div className="portrait">
          <img src="/images/portrait-kamen-karchev.png" alt="Kamen Karchev portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className="caption">
            <strong>Editorial portrait</strong>
            <span>Replace this with a calm desk photo — side light, laptop visible, cinematic but not overly posed.</span>
          </div>
        </div>
        <div className="pull-quote">
          "I want the site to feel like a newspaper profile of someone still early, but clearly becoming serious."
        </div>
      </motion.aside>
    </section>
  )
}
