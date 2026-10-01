import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { X, MessageSquare } from 'lucide-react'

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('')
  
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/contact') {
      setIsOpen(true)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-contact-popup', handleOpen)
    return () => window.removeEventListener('open-contact-popup', handleOpen)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.target)
    
    // Updated with the provided Web3Forms access key
    formData.append("access_key", "cfd83c91-1373-4c9d-a22b-0c0b61d8d5d3")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        e.target.reset()
        setTimeout(() => {
          setIsOpen(false)
          setStatus('')
        }, 3000)
      } else {
        console.log("Error", data)
        setStatus('error')
      }
    } catch (error) {
      console.log("Error", error)
      setStatus('error')
    }
  }

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#111',
          color: 'white',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'bounce 2s infinite ease-in-out'
        }}
        aria-label="Contact Us"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '100%',
            maxWidth: '340px',
            position: 'relative',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <X size={18} />
            </button>
            
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#111' }}>Connect with Us</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="hidden" name="subject" value="New Contact Form Submission - Dhion Technologies" />
              <input type="hidden" name="from_name" value="Dhion Tech Website" />

              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '4px', fontSize: '13px', color: '#444', fontWeight: '500' }}>Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  required 
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' }}
                />
              </div>
              
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '4px', fontSize: '13px', color: '#444', fontWeight: '500' }}>Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  required 
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' }}
                />
              </div>
              
              <div>
                <label htmlFor="mobile" style={{ display: 'block', marginBottom: '4px', fontSize: '13px', color: '#444', fontWeight: '500' }}>Mobile No</label>
                <input 
                  type="tel" 
                  id="mobile"
                  name="mobile" 
                  required 
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' }}
                />
              </div>
              
              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '4px', fontSize: '13px', color: '#444', fontWeight: '500' }}>Message</label>
                <textarea 
                  id="message"
                  name="message" 
                  required 
                  rows="3"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', resize: 'vertical', boxSizing: 'border-box', fontSize: '14px' }}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                style={{ 
                  backgroundColor: '#111', 
                  color: 'white', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  border: 'none', 
                  cursor: status === 'sending' ? 'default' : 'pointer',
                  fontWeight: 'bold',
                  marginTop: '4px',
                  opacity: status === 'sending' ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                  fontSize: '14px'
                }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p style={{ color: 'green', fontSize: '13px', margin: 0, textAlign: 'center', fontWeight: '500' }}>Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p style={{ color: 'red', fontSize: '13px', margin: 0, textAlign: 'center', fontWeight: '500' }}>Failed to send. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}
