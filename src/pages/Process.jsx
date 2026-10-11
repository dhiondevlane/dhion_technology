import { usePageTitle } from '../hooks/usePageTitle'
import { processSteps } from '../data/content'
import CTASection from '../components/CTASection'
import { useEffect, useState, useRef } from 'react'

export default function Process() {
  usePageTitle('Our Process')
  
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      let newActiveIndex = 0;
      const windowHeight = window.innerHeight;
      
      stepRefs.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          // The element becomes active when it passes the middle of the screen
          if (rect.top < windowHeight * 0.55) {
            newActiveIndex = index;
          }
        }
      });
      
      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll);
    // Give it a tiny delay to allow initial layout to settle
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="page-hero process-hero" style={{ paddingBottom: '32px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow" style={{ display: 'inline-block', padding: '6px 16px', background: '#f3e8ff', color: '#9333ea', borderRadius: '24px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', marginBottom: '16px' }}>How We Work</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px', color: '#111' }}>
            From Idea to Working Software
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#555', maxWidth: '720px', margin: '0 auto' }}>
            A clear, structured process that keeps your project on track from first conversation to production.
          </p>
        </div>
      </section>

      <section className="section process-steps" style={{ paddingTop: '16px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div className="process-timeline" style={{ position: 'relative', paddingLeft: '40px', maxWidth: '720px', margin: '48px auto 0' }}>
            
            {/* The vertical connecting line (Background gray line) */}
            <div style={{ position: 'absolute', left: '19px', top: '24px', bottom: '24px', width: '2px', background: '#eaeaea' }} />
            
            {/* The animated colored line that fills up as you scroll */}
            <div style={{ 
              position: 'absolute', 
              left: '19px', 
              top: '24px', 
              width: '2px', 
              background: 'linear-gradient(to bottom, #aa3bff, #d8b4fe)',
              transition: 'height 0.4s ease-out',
              // Calculate height based on active index (roughly filling between dots)
              height: activeIndex >= 0 ? `calc(${(activeIndex / (processSteps.length - 1)) * 100}% - 48px)` : '0px'
            }} />
            
            {processSteps.map((item, i) => {
              const isActive = i <= activeIndex;
              
              return (
                <div 
                  key={item.step} 
                  ref={el => stepRefs.current[i] = el}
                  style={{ position: 'relative', marginBottom: i === processSteps.length - 1 ? '0' : '56px' }}
                >
                  
                  {/* The Timeline Node / Number */}
                  <div style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '0',
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: isActive ? 'linear-gradient(135deg, #aa3bff, #9333ea)' : '#f5f5f5', 
                    color: isActive ? '#fff' : '#aaa',
                    border: isActive ? 'none' : '2px solid #eaeaea',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '15px', fontWeight: 'bold',
                    boxShadow: isActive ? '0 4px 16px rgba(147, 51, 234, 0.25)' : 'none',
                    zIndex: 2,
                    transition: 'all 0.5s ease',
                    boxSizing: 'border-box'
                  }}
                  >
                    {item.step}
                  </div>
                  
                  {/* The Content */}
                  <div style={{ 
                    paddingLeft: '32px', 
                    paddingTop: '4px', 
                    cursor: 'default',
                    opacity: isActive ? 1 : 0.4,
                    transform: isActive ? 'translateX(0)' : 'translateX(10px)',
                    transition: 'all 0.5s ease'
                  }}
                  >
                    <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 12px 0', color: isActive ? '#111' : '#666', transition: 'color 0.5s ease' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: isActive ? '#555' : '#888', lineHeight: '1.8', margin: 0, fontSize: '17px', transition: 'color 0.5s ease' }}>
                      {item.description}
                    </p>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
