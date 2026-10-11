import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePageTitle } from '../hooks/usePageTitle'
import { whyChooseUs, whoWeBuildFor } from '../data/content'
import CTASection from '../components/CTASection'
import tech2Img from '../assets/Tech2.jpg'

export default function About() {
  usePageTitle('About Us')
  
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  // Translates the container to the left as user scrolls down
  // Reduced from -65% to -48% to remove the extra empty space at the end of the track
  const trackRef = useRef(null)
  // On phones, slide exactly far enough to bring the last card fully into view
  const [mobileDistance, setMobileDistance] = useState(null)

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track || window.innerWidth > 600) return setMobileDistance(null)
      setMobileDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    mobileDistance === null ? ["0%", "-48%"] : [0, -mobileDistance]
  )

  return (
    <>
      <section className="section about-intro" style={{ padding: '40px 0 80px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 'bold', color: '#111', marginBottom: '24px', letterSpacing: '-1px' }}>
            About Us
          </h1>
          <p style={{ fontSize: '18px', color: '#444', lineHeight: '1.7', marginBottom: '40px' }}>
            <strong>Dhion Technologies</strong> is an IT Solutions &amp; Software Consultancy focused on developing customized digital solutions for businesses, organizations, and entrepreneurs. We work closely with our clients to understand their existing workflow, identify operational challenges, and build technology that fits their actual requirements. Whether you need a complete business platform, a mobile application, a backend system, an automation solution, or a specialized dashboard, we take your idea from concept to deployment.
          </p>
          <div className="about-intro-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/services" style={{ background: '#111', color: '#fff', padding: '14px 32px', borderRadius: '4px', fontWeight: '500', textDecoration: 'none', fontSize: '15px' }}>
              Our Services
            </Link>
            <button onClick={() => window.dispatchEvent(new Event('open-contact-popup'))} style={{ background: '#fff', color: '#111', padding: '14px 32px', borderRadius: '4px', fontWeight: '500', border: '1px solid #ccc', fontSize: '15px', cursor: 'pointer' }}>
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={targetRef} className="about-scroll" style={{ height: '300vh', background: '#FFFFFF' }}>
        <div className="about-scroll-panel" style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          
          <div className="container" style={{ marginBottom: '40px' }}>
            <div className="section-head center">
              <span className="eyebrow">Why Choose Us</span>
              <h2>We Don't Just Build Software. We Understand Workflows.</h2>
            </div>
          </div>
          
          {/* Scrolling Track */}
          <motion.div ref={trackRef} className="about-track" style={{ x, display: 'flex', gap: '24px', padding: '0 5vw', width: 'max-content' }}>
            {whyChooseUs.map((item) => (
              <div className="card about-track-card" key={item.title} style={{ 
                width: '380px', 
                flexShrink: 0, 
                background: '#FFFFFF',
                border: '1px solid #eaeaea',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                padding: '32px', 
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#d8b4fe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = '#eaeaea';
              }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #aa3bff, #111)' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#111', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#aa3bff' }}></div>
                  {item.title}
                </h3>
                <p style={{ color: '#555', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      <section className="section about-who" style={{ padding: '20px 0 60px' }}>
        <div className="container about-who-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
          
          {/* Left Image Side */}
          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '100%', 
              paddingBottom: '75%', // aggressively reduced aspect ratio
              backgroundColor: '#e5e7eb',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={tech2Img} 
                alt="Our Team" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right Content Side */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>
              Who We Build For
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111', lineHeight: '1.1', marginBottom: '12px', letterSpacing: '-1px' }}>
              Software Tailored To Your Industry.
            </h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', marginBottom: '1px' }}>
              Our solutions can be customized for a wide range of businesses and organizations. We are dedicated to helping you achieve your goals with a simple, user-friendly experience that sets you apart.
            </p>

            {/* 2x2 Grid with Inner Borders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '24px' }}>
              {whoWeBuildFor.slice(0, 4).map((item, i) => (
                <div key={item.title} style={{ 
                  padding: i % 2 === 0 ? '12px 18px 18px 0' : '12px 0 18px 18px',
                  paddingTop: i > 1 ? '18px' : '0',
                  paddingBottom: i < 2 ? '18px' : '0',
                  borderRight: i % 2 === 0 ? '1px solid #E5E7EB' : 'none',
                  borderBottom: i < 2 ? '1px solid #E5E7EB' : 'none'
                }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111', marginBottom: '6px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* <Link to="/contact" className="btn" style={{ background: '#111', color: '#fff', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', fontSize: '13px' }}>
              Start Projects
            </Link> */}
          </div>

        </div>
      </section>

      <CTASection />
    </>
  )
}
