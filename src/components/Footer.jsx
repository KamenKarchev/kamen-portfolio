export default function Footer({ copy }) {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {copy.copyright}</span>
      <span>{copy.tagline}</span>
    </footer>
  )
}
