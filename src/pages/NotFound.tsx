import { Link } from 'react-router-dom'
import useTitle from '../components/useTitle'

export default function NotFound() {
  useTitle('Page not found | Jb Yashvi')
  return (
    <section className="notfound wrap">
      <h1 className="display-2">This page doesn’t exist.</h1>
      <p>The link may be out of date. The work is all on the home page.</p>
      <Link to="/#work" className="btn btn--solid">Go to selected work</Link>
    </section>
  )
}
