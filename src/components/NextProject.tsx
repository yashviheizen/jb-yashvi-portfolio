import { Link } from 'react-router-dom'
import { nextProject } from '../data/projects'

export default function NextProject({ slug }: { slug: string }) {
  const next = nextProject(slug)
  return (
    <nav className="next" aria-label="More work">
      <div className="wrap next__inner">
        <Link to="/#work" className="back">
          <span aria-hidden="true">←</span> All work
        </Link>
        <Link to={`/work/${next.slug}`} className="next__link">
          <span className="next__label">Next project</span>
          <span className="next__name">{next.name} <span aria-hidden="true">→</span></span>
        </Link>
      </div>
    </nav>
  )
}
