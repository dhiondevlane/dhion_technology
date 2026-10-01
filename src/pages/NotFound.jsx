import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page Not Found')

  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: 24 }}>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </section>
  )
}
