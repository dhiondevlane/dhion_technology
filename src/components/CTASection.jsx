import { Link } from 'react-router-dom'

export default function CTASection({
  title = "Let's Start Talk",
  description = "Have a project in mind? Just let us know!",
  primary = { label: 'Connect With Us', to: '/contact' },
}) {
  return (
    <section className="section cta-section" style={{ padding: '60px 0', background: '#fff' }}>
      <div className="container">
        <div style={{
          position: 'relative',
          backgroundColor: '#050505',
          borderRadius: '16px',
          overflow: 'hidden',
          padding: '50px 40px',
          textAlign: 'center',
          color: '#fff',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          
          {/* Ribbed metallic background pattern - faded in center */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'repeating-linear-gradient(to bottom, #2a2a2a 0px, #111 1px, #111 20px)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
            maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
            pointerEvents: 'none',
          }}></div>
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px', color: '#fff' }}>
              {description}
            </p>
            <h2 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1, letterSpacing: '-1px', color: '#fff' }}>
              {title}
            </h2>
            {primary.to === '/contact' ? (
              <button 
                onClick={() => window.dispatchEvent(new Event('open-contact-popup'))} 
                className="btn" 
                style={{ 
                  background: '#fff', 
                  color: '#000', 
                  padding: '14px 32px', 
                  borderRadius: '4px', 
                  fontWeight: '600', 
                  fontSize: '15px', 
                  display: 'inline-block',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {primary.label}
              </button>
            ) : (
              <Link to={primary.to} className="btn" style={{ 
                background: '#fff', 
                color: '#000', 
                padding: '14px 32px', 
                borderRadius: '4px', 
                fontWeight: '600', 
                fontSize: '15px', 
                display: 'inline-block',
                transition: 'all 0.2s ease'
              }}>
                {primary.label}
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

