import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-links">
        <a href="mailto:kazzy96@email.com">kazzy96@email.com</a>
        <a
          href="https://github.com/Kazzy96"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/kazzy96"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <p className="copyright">© {year} Kazzy96. All rights reserved.</p>
    </footer>
  )
}
