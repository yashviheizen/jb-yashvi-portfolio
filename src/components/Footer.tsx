import { contact } from '../data/projects'
import Appearance from './Appearance'
import Clock from './Clock'

/**
 * A compact closing row; on the home page it reads as the last row of the Contact grid. Below
 * it, across the full width, the Appearance setting (Light or Dark).
 */
export default function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <div className="wrap">
        <div className="footer__row">
          <div className="footer__lead">
            <p className="footer__name">
              Jb Yashvi <span className="footer__role">Product Designer</span>
            </p>
            <Clock />
          </div>
          <p>
            <a className="footer__link" href={contact.resume} target="_blank" rel="noreferrer">
              Résumé <span aria-hidden="true">↗</span>
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </p>
          <p>© {new Date().getFullYear()}</p>
          <div className="footer__settings">
            <Appearance />
          </div>
        </div>
      </div>
    </footer>
  )
}
