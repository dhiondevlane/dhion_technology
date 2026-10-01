import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'
import { solutions } from '../../data/content'
import CTASection from '../../components/CTASection'

export default function ParkingBay() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const solution = solutions.find((s) => s.slug === 'parkingbay')

  usePageTitle(solution?.name)

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }

  const handleScroll = () => {
    if (sliderRef.current) {
      setCanScrollLeft(sliderRef.current.scrollLeft > 5);
    }
  }

  return (
    <>
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap', paddingLeft: '24px', paddingRight: '24px' }}>
          
          <div style={{ flex: '1', minWidth: '350px', maxWidth: '600px' }}>
            {solution.tagline && (
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#01875f', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', display: 'block' }}>
                {solution.tagline}
              </span>
            )}
            <h1 style={{ fontSize: '64px', fontWeight: '800', color: '#111', margin: '0 0 8px 0', letterSpacing: '-2px', lineHeight: '1.1' }}>
              {solution.name}
            </h1>
            <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.7', margin: '0 0 16px 0', maxWidth: '800px' }}>
              {solution.intro}
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://play.google.com/store/apps/details?id=com.onkarsarang.parking_Vendor&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#000', color: '#fff', padding: '12px 28px', borderRadius: '12px', fontWeight: '600', textDecoration: 'none', fontSize: '16px', transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 2.5v19l15-9.5-15-9.5z" fill="#fff"/></svg>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '11px', fontWeight: '400', opacity: 0.8, lineHeight: 1, marginBottom: '2px' }}>GET IT ON</span>
                  <span style={{ fontSize: '18px', lineHeight: 1 }}>Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <img 
              src="/parking/ParkingBay.png" 
              alt="ParkingBay App" 
              style={{ 
                width: '100%', 
                maxWidth: '380px', 
                height: 'auto', 
                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.12))',
                transform: 'rotate(-2deg)',
                transition: 'transform 0.5s ease'
              }} 
              onMouseOver={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'rotate(-2deg) scale(1)'}
            />
          </div>

        </div>
      </section>

      <section className="section" style={{ padding: '64px 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px' }}>
          
          <div style={{ display: 'flex', gap: '64px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Left Side: Header */}
            <div style={{ flex: '1', minWidth: '350px' }}>
              <h2 style={{ fontSize: '42px', fontWeight: '500', color: '#202124', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {solution.name}
              </h2>
              <div style={{ color: '#01875f', fontSize: '16px', fontWeight: '500', marginBottom: '24px' }}>
                DevlaneCorp
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #e0e0e0', paddingRight: '32px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#202124' }}>10+</span>
                  <span style={{ fontSize: '12px', color: '#5f6368' }}>Downloads</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#202124' }}>E</span>
                  <span style={{ fontSize: '12px', color: '#5f6368' }}>Everyone</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
                <a href="https://play.google.com/store/apps/details?id=com.onkarsarang.parking_Vendor&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" style={{ background: '#01875f', color: '#fff', padding: '10px 48px', borderRadius: '8px', fontSize: '15px', fontWeight: '500', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                  Install
                </a>
                <button style={{ background: 'none', color: '#01875f', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                  Share
                </button>
                <button style={{ background: 'none', color: '#01875f', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path><line x1="12" y1="7" x2="12" y2="13"></line><line x1="9" y1="10" x2="15" y2="10"></line></svg>
                  Add to wishlist
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#5f6368', fontSize: '14px', marginBottom: '32px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                This app is available for your device
              </div>
              
              {solution.description && (
                <p style={{ fontSize: '15px', color: '#5f6368', lineHeight: '1.6', maxWidth: '780px', margin: 0 }}>
                  {solution.description}
                </p>
              )}
            </div>

            {/* Right Side: Screenshots Slider */}
            <div style={{ flex: '1.5', minWidth: '300px', position: 'relative' }}>
              <div ref={sliderRef} onScroll={handleScroll} style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', msOverflowStyle: 'none', scrollbarWidth: 'none', scrollBehavior: 'smooth' }}>
                {[1, 2, 3, 4, 5].map(num => (
                  <img 
                    key={num}
                    src={`/parking/Playstore_${num}.png`}
                    alt={`Screenshot ${num}`}
                    style={{ 
                      height: '450px', 
                      borderRadius: '16px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      flexShrink: 0,
                      objectFit: 'contain'
                    }} 
                  />
                ))}
              </div>
              {/* Left Arrow Button Overlay */}
              {canScrollLeft && (
                <div onClick={scrollLeft} style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', zIndex: 2 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </div>
              )}
              {/* Right Arrow Button Overlay */}
              <div onClick={scrollRight} style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', zIndex: 2 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="section" style={{ padding: '80px 0 0 0', background: '#fcfcfc' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ display: 'inline-block', padding: '6px 16px', background: '#e6f4ea', color: '#137333', borderRadius: '24px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              About The Platform
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '24px', color: '#111', letterSpacing: '-0.5px' }}>
              Smart Parking Management System
            </h2>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
              <strong>ParkingBay</strong> is a smart parking management application designed to simplify and automate the complete operations of a parking business. It enables owners to efficiently manage vehicle entries and exits, parking bookings, payments, workers, discounts, and business analytics from a single platform.
            </p>
          </div>

          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px', color: '#111' }}>Key Features</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  
                  {/* Feature 1 */}
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.2s, boxShadow 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e6f4ea', color: '#137333', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                    </div>
                    <strong style={{ color: '#111', fontSize: '18px', display: 'block', marginBottom: '8px' }}>Vehicle Entry & Exit</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>Staff can quickly register vehicles. The system supports <strong>number plate scanning</strong>, automatically capturing the registration and reducing manual entry.</p>
                  </div>

                  {/* Feature 2 */}
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.2s, boxShadow 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e8f0fe', color: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
                    </div>
                    <strong style={{ color: '#111', fontSize: '18px', display: 'block', marginBottom: '8px' }}>Automatic Categorization</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>Vehicles are automatically identified and categorized by type (<strong>car, bike, etc.</strong>). Complete registration records are securely maintained.</p>
                  </div>

                  {/* Feature 3 */}
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.2s, boxShadow 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fce8e6', color: '#c5221f', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <strong style={{ color: '#111', fontSize: '18px', display: 'block', marginBottom: '8px' }}>Flexible Parking Rates</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>Configure different charges based on vehicle type and duration. Separate <strong>day and night rates</strong> can be customized easily.</p>
                  </div>

                  {/* Feature 4 */}
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.2s, boxShadow 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fef7e0', color: '#f29900', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                    <strong style={{ color: '#111', fontSize: '18px', display: 'block', marginBottom: '8px' }}>Cash Flow Management</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>Complete payment management supporting direct <strong>UPI</strong> transactions and cash collections, all monitored in real time.</p>
                  </div>

                  {/* Feature 5 */}
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.2s, boxShadow 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f3e8fd', color: '#aa3bff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    </div>
                    <strong style={{ color: '#111', fontSize: '18px', display: 'block', marginBottom: '8px' }}>Discounts & Offers</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>Create and apply <strong>custom discounts</strong> based on business requirements, providing flexibility for special customer pricing.</p>
                  </div>

                  {/* Feature 6 */}
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.2s, boxShadow 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e4f7fb', color: '#12b5cb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <strong style={{ color: '#111', fontSize: '18px', display: 'block', marginBottom: '8px' }}>Staff & Analytics</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>Easily manage workers, assign roles, and access deep business analytics including <strong>daily performance and revenue reports</strong>.</p>
                  </div>

                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '8px', color: '#222' }}>Complete Digital Parking Solution</h3>
                <p>
                  ParkingBay brings the entire parking operation into one centralized system, reducing manual work and improving accuracy and transparency. From <strong>vehicle entry through number plate scanning to parking, payment collection, vehicle exit, worker management, and business analytics</strong>, the application provides an efficient and easy-to-manage solution for modern parking businesses.
                </p>
              </div>

          {solution.note && <p className="note" style={{ marginTop: '48px' }}>{solution.note}</p>}
        </div>
      </section>

      <CTASection
        title={`Discuss Your ${solution.name} Project`}
        description="Have an idea? Need a custom software solution? Let's discuss it."
      />
    </>
  )
}

