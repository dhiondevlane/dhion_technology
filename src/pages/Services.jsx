import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import { services } from '../data/content'
import CTASection from '../components/CTASection'

export default function Services() {
  usePageTitle('Services')
  // Which service is expanded in the mobile accordion
  const [openService, setOpenService] = useState(null)

  return (
    <>
      <section className="section services-hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', background: '#fff' }}>
        <div className="container">
          {/* Added paddingLeft to align with the cards below, and restricted width */}
          <div style={{ maxWidth: '900px', paddingLeft: '10px' }}>
            <h1 style={{ fontSize: '56px', fontWeight: '700', color: '#111', marginBottom: '24px', letterSpacing: '-1px', lineHeight: '1.1' }}>
              Custom Software Development
            </h1>
            <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.6', marginBottom: '32px', maxWidth: '800px' }}>
              Software designed specifically around your business processes, users, roles, and operational requirements.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => window.dispatchEvent(new Event('open-contact-popup'))} style={{ background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '4px', fontWeight: '500', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                Start Projects
              </button>
              <button onClick={() => window.dispatchEvent(new Event('open-contact-popup'))} style={{ background: '#FF7A59', color: '#111', padding: '12px 24px', borderRadius: '4px', fontWeight: '500', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                Get a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#111', color: '#fff', padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '-1px', color: '#fff' }}>
              Your Needs, Our Expertise
            </h2>
            <p style={{ fontSize: '16px', color: '#aaa', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
              Your Vision, Our Expertise — Together, we bring ideas to life with tailored solutions that deliver real results. Let's build something amazing.
            </p>
          </div>

          {/* List */}
          <div>
            {services.map((service, i) => (
              <div
                key={service.slug}
                className={`service-row${openService === i ? ' open' : ''}`}
                onClick={() => setOpenService((v) => (v === i ? null : i))}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  padding: '24px 0',
                  borderBottom: '1px solid #444'
                }}
              >
                <div style={{ maxWidth: '760px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '15px', color: '#666', fontWeight: '500' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0, letterSpacing: '-0.5px', color: '#fff' }}>
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className="service-details">
                  <div>
                  <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.6', margin: 0 }}>
                    {service.summary}
                  </p>
                  {service.description && (
                    <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.6', marginTop: '8px', marginBottom: 0 }}>
                      {service.description}
                    </p>
                  )}
                  {service.highlight && (
                    <p style={{ marginTop: '12px', fontStyle: 'italic', color: '#fff', fontWeight: '500', marginBottom: 0, fontSize: '14px' }}>
                      {service.highlight}
                    </p>
                  )}
                  {service.points && (
                    <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {service.points.map((point) => (
                        <span key={point} style={{ background: '#222', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', color: '#ddd' }}>
                          {point}
                        </span>
                      ))}
                    </div>
                  )}
                  {service.note && <p style={{ marginTop: '12px', fontSize: '12px', color: '#777', marginBottom: 0 }}>{service.note}</p>}
                  </div>
                  </div>
                </div>

                <div className="service-toggle" style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  border: '1px solid #333', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#fff',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  marginTop: '2px'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#222'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <CTASection
        title="Not Sure Which Service You Need?"
        description="Tell us about your business and we'll recommend the right combination of services to solve it."
      />
    </>
  )
}
