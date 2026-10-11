import { Link } from 'react-router-dom'
import { useState } from 'react'
import { company, solutions } from '../data/content'
import logoIcon from '../assets/logo-icon.png'

export default function Footer() {
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" style={{ background: '#0a0a0a', color: '#fff', paddingTop: '80px', fontFamily: 'sans-serif', borderTop: '1px solid #1a1a1a' }}>
      <div className="container">
        

        {/* Links Section */}
        <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '48px', maxWidth: '900px', margin: '0 auto 80px auto' }}>
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '24px' }}>
              <img src={logoIcon} alt="Logo" style={{ height: '32px', width: 'auto' }} />
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', letterSpacing: '-0.5px' }}>{company.name}</span>
            </Link>
            <ul className="footer-nav" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><Link to="/about" onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#aaa'} style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>About Us</Link></li>
              <li><Link to="/services" onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#aaa'} style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Services</Link></li>
              <li>
                <button 
                  onClick={() => setSolutionsOpen(!solutionsOpen)} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#aa3bff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = solutionsOpen ? '#aa3bff' : '#aaa'}
                  style={{ background: 'none', border: 'none', color: solutionsOpen ? '#aa3bff' : '#aaa', fontSize: '14px', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                >
                  Solutions
                  <svg style={{ transform: solutionsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                {solutionsOpen && (
                  <ul style={{ listStyle: 'none', padding: '12px 0 0 12px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li><Link to="/parkingbay" onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#888'} style={{ color: '#888', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>ParkingBay</Link></li>
                    <li><Link to="/homedelivery" onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#888'} style={{ color: '#888', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Home Delivery</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/process" onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#aaa'} style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Our Process</Link></li>
            </ul>
          </div>


          <div className="footer-col footer-card">
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', color: '#fff' }}>Utilities</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><Link to="/privacy" onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#aaa'} style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Privacy Policy</Link></li>
              <li><Link to="/terms" onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#aaa'} style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Terms of Service</Link></li>
              <li><button onClick={() => window.dispatchEvent(new Event('open-contact-popup'))} onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#aaa'} style={{ background: 'none', border: 'none', color: '#aaa', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}>Contact Support</button></li>
              <li><span style={{ color: '#aaa', fontSize: '14px' }}>Udyam: {company.udyam}</span></li>
            </ul>
          </div>

          <div className="footer-col footer-card">
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', color: '#fff' }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {company.phone.split(' | ').map((phoneNum, idx) => (
                  <a href={`tel:${phoneNum.replace(/[^+\d]/g, '')}`} key={idx} style={{ color: '#aaa', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <svg style={{ opacity: idx === 0 ? 1 : 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#aa3bff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>{phoneNum}</span>
                  </a>
                ))}
              </li>
              <li style={{ color: '#aaa', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <a href={`mailto:${company.email}`} style={{ color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#aa3bff'; e.currentTarget.children[1].style.color = '#aa3bff'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#aaa'; e.currentTarget.children[1].style.color = '#aaa'; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span>{company.email}</span>
                </a>
              </li>
              <li style={{ marginTop: '8px' }}>
                <a href="https://www.instagram.com/dhiontech?stkn=dGlhejFjZDFuYXIx" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#aaa', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#aa3bff'; e.currentTarget.children[0].style.fill = '#aa3bff'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#aaa'; e.currentTarget.children[0].style.fill = '#aaa'; }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa" style={{ transition: 'fill 0.2s' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Follow Us on Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-copy" style={{ borderTop: '1px solid #1a1a1a', paddingTop: '32px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ color: '#aaa', margin: 0, fontSize: '14px', textAlign: 'center' }}>
            Designed by <span style={{ color: '#fff', fontWeight: 'bold' }}>{company.name}</span> Powered by <span style={{ color: '#fff', fontWeight: 'bold' }}>DevlaneCorp</span> &copy; {year}
          </p>
        </div>


      </div>
    </footer>
  )
}

