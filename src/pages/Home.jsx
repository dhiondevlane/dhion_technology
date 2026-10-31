import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import { services, solutions, whyChooseUs } from '../data/content'
import CTASection from '../components/CTASection'
import { motion, useScroll, useTransform } from 'framer-motion'
import tech1Img from '../assets/Tech1.jpg'

const ServiceCard = ({ service, i, scrollYProgress }) => {
  const isLeft = i % 2 === 0;
  const isTop = i < 2;
  const startX = isLeft ? 'calc(50% + 6px)' : 'calc(-50% - 6px)';
  const startY = isTop ? 'calc(50% + 6px)' : 'calc(-50% - 6px)';

  const x = useTransform(scrollYProgress, [0, 1], [startX, '0%']);
  const y = useTransform(scrollYProgress, [0, 1], [startY, '0%']);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  
  return (
    <motion.div className="card stat-card" style={{
      x, y, scale,
      background: '#fff', 
      padding: '16px', 
      borderRadius: '12px', 
      border: '1px solid var(--border)', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
      zIndex: 4 - i,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '6px', 
        background: '#f3e8ff', color: '#9333ea', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        marginBottom: '10px'
      }}>
        {i === 0 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>}
        {i === 1 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>}
        {i === 2 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>}
        {i === 3 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>}
      </div>
      <h3 style={{fontSize: '14px', margin: '0 0 6px', fontWeight: 'bold', color: '#111', lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{service.title}</h3>
      <p style={{fontSize: '12px', color: 'var(--text)', lineHeight: '1.4', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{service.summary}</p>
    </motion.div>
  )
}

export default function Home() {
  usePageTitle()

  const gridRef = useRef(null)
  const isTouchRef = useRef(false)
  const [activeSolution, setActiveSolution] = useState(null)

  const handleMouseEnter = (i) => {
    if (isTouchRef.current) return
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) return
    setActiveSolution(i)
  }

  const handleMouseLeave = () => {
    if (isTouchRef.current) return
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) return
    setActiveSolution(null)
  }

  const handleClick = (i) => {
    setActiveSolution((prev) => (prev === i ? null : i))
  }

  const handleTouchStart = () => {
    isTouchRef.current = true
  }
  
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 90%", "start 40%"] 
  })

  return (
    <>
      <section className="hero home-hero" style={{ minHeight: 'auto', paddingTop: '40px', display: 'block' }}>
        <div className="container hero-split">
          <div className="hero-content">
            <h1 style={{fontSize: '48px', lineHeight: '1.1', marginBottom: '16px', fontWeight: 'bold', color: '#111'}}>We build software around the way your business works.</h1>
            <p className="lead" style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--text)', marginBottom: '32px', maxWidth: '540px' }}>
              We transform your real-world requirements into custom software, mobile applications, and cloud solutions that help your business operate smarter, reduce manual work, and scale with confidence.
            </p>
            <div className="btn-row" style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
              <button onClick={() => window.dispatchEvent(new Event('open-contact-popup'))} className="btn btn-primary" style={{background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '500', cursor: 'pointer', fontSize: '15px'}}>Start Your Project</button>
              {/* <Link to="/solutions" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: 'none', padding: 0, color: '#111', fontWeight: '500' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid currentColor' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </span>
                Watch Demo
              </Link> */}
            </div>
          </div>
          <div className="hero-image-wrapper">
             <img src={tech1Img} alt="Software development" />
          </div>
        </div>
      </section>

      <section className="partners-section">
        <div className="container">
          <div className="divider-with-badge">
            <span>Trusted Partners Worldwide for Success</span>
          </div>
        </div>
        <div className="logo-carousel">
          <div className="logo-carousel-track">
            {/* Real logos should replace these text items */}
            <span className="logo-carousel-item">abbvie</span>
            <span className="logo-carousel-item" style={{textTransform: 'lowercase'}}>align</span>
            <span className="logo-carousel-item">BUNGE</span>
            <span className="logo-carousel-item">DISCOVER</span>
            <span className="logo-carousel-item">ESSEX</span>
            <span className="logo-carousel-item">HOLOGIC</span>
            <span className="logo-carousel-item" style={{textTransform: 'none'}}>Insulet</span>
            <span className="logo-carousel-item">MASCO</span>
            <span className="logo-carousel-item">MOODY'S</span>
            {/* Duplicated for infinite scroll effect */}
            <span className="logo-carousel-item">abbvie</span>
            <span className="logo-carousel-item" style={{textTransform: 'lowercase'}}>align</span>
            <span className="logo-carousel-item">BUNGE</span>
            <span className="logo-carousel-item">DISCOVER</span>
            <span className="logo-carousel-item">ESSEX</span>
            <span className="logo-carousel-item">HOLOGIC</span>
            <span className="logo-carousel-item" style={{textTransform: 'none'}}>Insulet</span>
            <span className="logo-carousel-item">MASCO</span>
            <span className="logo-carousel-item">MOODY'S</span>
          </div>
        </div>
      </section>

      <section className="section section-alt what-we-do" style={{ padding: '24px 0 40px' }}>
        <div className="container">
          <div className="section-head center" style={{ marginBottom: '20px' }}>
            <span className="eyebrow" style={{background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', padding: '4px 12px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px', textTransform: 'none', letterSpacing: 'normal', marginBottom: '8px'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              What We Do
            </span>
            <h2 className="what-we-do-title" style={{fontWeight: 'bold', color: '#111', margin: '0 0 8px'}}>Build Smarter. Operate Better. Grow Faster.</h2>
            <p style={{fontSize: '15px', color: 'var(--text)', margin: 0}}>End-to-end software development across web, mobile, backend, and cloud.</p>
          </div>
          
          <div className="about-split what-we-do-split">
            <div className="about-image what-we-do-image">
               <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop" alt="What We Do" />
            </div>
            <div className="about-content">
              <div ref={gridRef} className="grid grid-2 what-we-do-cards" style={{gap: '12px'}}>
                {services.slice(0, 4).map((service, i) => (
                  <ServiceCard key={i} service={service} i={i} scrollYProgress={scrollYProgress} />
                ))}
              </div>
              <div className="what-we-do-actions" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Link to="/services" className="btn" style={{background: '#111', color: '#fff', padding: '10px 20px'}}>More About Us</Link>
                {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <div style={{fontSize: '12px', fontWeight: '500'}}>Get free Quote</div>
                    <div style={{fontSize: '15px', fontWeight: 'bold', color: 'var(--text-h)'}}>22 (00) 356 7890</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#111', color: '#fff', padding: '40px 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container">
          <div className="section-head center" style={{ marginBottom: '32px' }}>
            <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              Our Solutions
            </span>
            <h2 style={{ color: '#fff', fontSize: '28px', marginTop: '16px', marginBottom: '8px' }}>Products Built From Real-World Systems</h2>
            <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto', fontSize: '14px' }}>A look at what we've built when businesses bring us their actual workflows.</p>
          </div>
          <div className="solutions-list" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {solutions
              .filter((s) => s.slug !== 'custom')
              .map((solution, i) => (
                <div
                  key={solution.slug}
                  className={`solutions-accordion-item ${activeSolution === i ? 'active' : ''}`}
                  onTouchStart={handleTouchStart}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(i)}
                >
                  <div className="solutions-accordion-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ 
                        fontSize: '13px', 
                        color: activeSolution === i ? '#FF6B4A' : '#666', 
                        fontWeight: '600',
                        fontVariantNumeric: 'tabular-nums',
                        transition: 'color 0.3s ease'
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 style={{ 
                        fontSize: '22px', 
                        margin: 0, 
                        fontWeight: '600', 
                        color: activeSolution === i ? '#FF6B4A' : '#fff',
                        transition: 'color 0.3s ease'
                      }}>
                        {solution.name}
                      </h3>
                    </div>

                    <div style={{ 
                      width: '34px', 
                      height: '34px', 
                      borderRadius: '50%', 
                      border: activeSolution === i ? '1px solid #FF6B4A' : '1px solid #444',
                      background: activeSolution === i ? '#FF6B4A' : 'transparent',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#fff', 
                      flexShrink: 0,
                      transform: activeSolution === i ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.3s ease'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Expanded Body: Description & Well-Placed Preview Card */}
                  <div 
                    className="solutions-accordion-body"
                    style={{
                      maxHeight: activeSolution === i ? '600px' : '0px',
                      opacity: activeSolution === i ? 1 : 0,
                    }}
                  >
                    <div className="solutions-accordion-content">
                      <div className="solutions-accordion-text">
                        <p style={{ fontSize: '14px', color: '#aaa', margin: 0, lineHeight: '1.65' }}>
                          {solution.summary}
                        </p>
                        {solution.slug === 'school-management' && (
                          <Link
                            to="/school-management"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              marginTop: '12px',
                              color: '#FF6B4A',
                              textDecoration: 'none',
                              fontSize: '13px',
                              fontWeight: '600',
                            }}
                          >
                            Explore Plans &amp; Pricing →
                          </Link>
                        )}
                        {solution.slug === 'parkingbay' && (
                          <Link
                            to="/parkingbay"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              marginTop: '12px',
                              color: '#FF6B4A',
                              textDecoration: 'none',
                              fontSize: '13px',
                              fontWeight: '600',
                            }}
                          >
                            View ParkingBay Solution →
                          </Link>
                        )}
                        {solution.slug === 'tandoor-hotel' && (
                          <Link
                            to="/homedelivery"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              marginTop: '12px',
                              color: '#FF6B4A',
                              textDecoration: 'none',
                              fontSize: '13px',
                              fontWeight: '600',
                            }}
                          >
                            View Food Delivery Ecosystem →
                          </Link>
                        )}
                      </div>

                      <div className="solutions-accordion-img-wrapper">
                        <img 
                          src={
                            solution.slug === 'school-management' ? "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80" :
                            solution.slug === 'parkingbay' ? "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&q=80" : 
                            solution.slug === 'tandoor-hotel' ? "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" :
                            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80"
                          }
                          alt={solution.name}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section why-choose-section" style={{ background: '#F8F9FA', padding: '100px 0' }}>
        <div className="container grid grid-2 why-choose" style={{ gap: '40px', alignItems: 'flex-start' }}>
          
          <div className="left-content" style={{ position: 'sticky', top: 'calc(50vh - 100px)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Why Choose Us
            </span>
            <h2 style={{ fontSize: '32px', lineHeight: '1.2', fontWeight: 'bold', color: '#111', marginBottom: '24px' }}>
              We Don't Just Build Software. We Understand Workflows.
            </h2>
            <button onClick={() => window.dispatchEvent(new Event('open-contact-popup'))} className="btn" style={{ background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontWeight: '500', display: 'inline-flex', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
              Start Project
            </button>
          </div>

          <div className="right-content" style={{ display: 'flex', flexDirection: 'column', gap: '40vh', paddingBottom: '10vh' }}>
            {whyChooseUs.slice(0, 3).map((item, i) => (
              <div key={item.title} className="why-card" style={{ '--i': i, 
                position: 'sticky',
                top: `calc(50vh - 120px + ${i * 90}px)`,
                background: '#fff', 
                borderRadius: '20px', 
                padding: '32px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                border: '1px solid #eaeaea',
                zIndex: i + 1,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = '#d8b4fe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#eaeaea';
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '12px', 
                    background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)', 
                    color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                  }}>
                    {i === 0 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
                    {i === 1 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>}
                    {i === 2 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>}
                  </div>
                  <span style={{ fontSize: '48px', fontWeight: '900', color: '#f3f4f6', lineHeight: 1, letterSpacing: '-2px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111', margin: '0 0 12px 0' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#555', margin: 0, lineHeight: '1.6' }}>{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <CTASection />
    </>
  )
}
