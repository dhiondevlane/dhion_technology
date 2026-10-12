import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { X, MessageSquare } from 'lucide-react'

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [status, setStatus] = useState('')
  
  const location = useLocation()
  const navigate = useNavigate()

  const handleOpen = () => {
    setIsClosing(false)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      if (location.pathname === '/contact') {
        navigate('/', { replace: true })
      }
    }, 280)
  }

  useEffect(() => {
    if (location.pathname === '/contact') {
      handleOpen()
    }
  }, [location.pathname])

  useEffect(() => {
    window.addEventListener('open-contact-popup', handleOpen)
    return () => window.removeEventListener('open-contact-popup', handleOpen)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

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
          handleClose()
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

          @keyframes popupFadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes popupFadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }

          @keyframes popupSlideFromBottom {
            0% {
              opacity: 0;
              transform: translateY(100vh);
            }
            60% {
              opacity: 1;
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes popupSlideToBottom {
            0% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(100vh);
            }
          }
        `}
      </style>
      <button 
        onClick={handleOpen}
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
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            padding: '16px',
            animation: isClosing ? 'popupFadeOut 0.28s ease forwards' : 'popupFadeIn 0.32s ease forwards',
            willChange: 'opacity'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '340px',
              position: 'relative',
              boxShadow: '0 18px 45px rgba(0,0,0,0.25)',
              animation: isClosing 
                ? 'popupSlideToBottom 0.28s cubic-bezier(0.4, 0, 1, 1) forwards' 
                : 'popupSlideFromBottom 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              willChange: 'transform, opacity'
            }}
          >
            <button 
              type="button"
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close"
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
