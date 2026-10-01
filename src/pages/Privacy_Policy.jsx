import React from 'react';
import { motion } from 'framer-motion';
import { usePageTitle } from '../hooks/usePageTitle';

export default function PrivacyPolicy() {
  usePageTitle('Privacy Policy');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const SectionHeading = ({ children, id }) => (
    <h2 id={id} style={{ 
      fontSize: '28px', 
      fontWeight: 'bold', 
      color: '#111', 
      marginTop: '48px', 
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: '2px solid #eaeaea',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #aa3bff, #FF6B4A)' }}></div>
      {children}
    </h2>
  );

  const SubHeading = ({ children }) => (
    <h3 style={{ 
      fontSize: '20px', 
      fontWeight: '700', 
      color: '#222', 
      marginTop: '32px', 
      marginBottom: '16px' 
    }}>
      {children}
    </h3>
  );

  const List = ({ items }) => (
    <ul style={{ 
      marginBottom: '24px', 
      paddingLeft: '0',
      listStyle: 'none',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '12px'
    }}>
      {items.map((item, i) => (
        <li key={i} style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '10px',
          background: '#f9f9fb',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '15px',
          color: '#555',
          border: '1px solid #f0f0f0'
        }}>
          <svg style={{ flexShrink: 0, marginTop: '2px', color: '#aa3bff' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Hero Header */}
      <section style={{ 
        padding: '100px 0 60px', 
        background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
        borderBottom: '1px solid #eaeaea',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ 
              display: 'inline-block',
              fontSize: '13px', 
              fontWeight: '700', 
              color: '#FF6B4A', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              marginBottom: '16px',
              padding: '6px 16px',
              background: 'rgba(255, 107, 74, 0.1)',
              borderRadius: '100px'
            }}>
              Legal Document
            </span>
            <h1 style={{ fontSize: '56px', fontWeight: '900', color: '#111', marginBottom: '24px', letterSpacing: '-2px', lineHeight: 1.1 }}>
              Privacy Policy
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', color: '#666', fontSize: '15px' }}>
              <p><strong>Effective Date:</strong> September 19, 2026</p>
              <p><strong>Last Updated:</strong> September 19, 2026</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section" style={{ padding: '60px 0 100px', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ 
              color: '#444', 
              lineHeight: '1.8', 
              fontSize: '16px' 
            }}
          >
            <motion.div variants={itemVariants} style={{ 
              background: '#fff', 
              padding: '40px', 
              borderRadius: '24px', 
              boxShadow: '0 20px 60px rgba(0,0,0,0.04)',
              border: '1px solid #eaeaea',
              marginBottom: '40px'
            }}>
              <p style={{ fontSize: '18px', color: '#333', marginBottom: '24px' }}>
                This Privacy Policy explains how <strong>Hotel Tandoor Corner</strong> ("we", "our", or "us"), operated by Onkar Sarang / Devlanecorp, collects, uses, stores, and protects information when you use our mobile application, website, and related services (collectively, the "Service").
              </p>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '12px',
                background: '#fafafa',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ width: '120px', color: '#888', fontWeight: '600' }}>App name:</span>
                  <strong style={{ color: '#111' }}>Hotel Tandoor Corner</strong>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ width: '120px', color: '#888', fontWeight: '600' }}>Package name:</span>
                  <strong style={{ color: '#111' }}>com.tandooruser</strong>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ width: '120px', color: '#888', fontWeight: '600' }}>Company:</span>
                  <strong style={{ color: '#111' }}>Dhion Technology powered by Devlanecorp</strong>
                </div>
              </div>
              
              <p style={{ marginTop: '24px', marginBottom: 0, fontStyle: 'italic', color: '#666' }}>
                By using the Service, you agree to the practices described in this Privacy Policy.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>1. Information We Collect</SectionHeading>
              <p>Depending on how you use the Service, we may collect the following information:</p>

              <SubHeading>A. Account and Profile Information</SubHeading>
              <p>When you create an account or profile, we may collect:</p>
              <List items={[
                "Name",
                "Email address",
                "Mobile/phone number",
                "Date of birth or age-related information",
                "Profile photograph",
                "Wrestling-related information",
                "Other information you voluntarily provide"
              ]} />

              <SubHeading>B. Location Information</SubHeading>
              <p>With your permission, the application may access your device's location. Location may be used for purposes such as:</p>
              <List items={[
                "Providing location-based services",
                "Showing nearby restaurant services and delivery-related features",
                "Improving restaurant discovery",
                "Supporting location-related application functionality",
                "Preventing fraud or misuse where applicable"
              ]} />
              <p style={{ background: '#fff5f2', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #FF6B4A', color: '#d94b26', fontSize: '15px' }}>
                We request location permission only when it is required for a relevant feature. You can disable location access through your device settings. We do not sell your precise location information to third parties.
              </p>

              <SubHeading>C. Wi-Fi Information</SubHeading>
              <p>Where required for application functionality, the application may access information related to the device's Wi-Fi/network connection. This information may be used to:</p>
              <List items={[
                "Determine network connectivity",
                "Support application functionality",
                "Diagnose connectivity problems",
                "Improve application performance and reliability"
              ]} />
              <p>We do not use Wi-Fi information to monitor the contents of your communications.</p>

              <SubHeading>D. Bluetooth Information</SubHeading>
              <p>Where required for supported features, the application may request Bluetooth access. Bluetooth access may be used to:</p>
              <List items={[
                "Discover nearby compatible devices",
                "Connect to supported Bluetooth devices",
                "Exchange information with compatible devices",
                "Support application-specific device functionality"
              ]} />

              <SubHeading>E. Transaction and E-Commerce Information</SubHeading>
              <p>Our Service may provide e-commerce functionality, including purchasing products, registrations, subscriptions, tickets, services, or other offerings. Depending on the transaction, we may collect:</p>
              <List items={[
                "Order information",
                "Product/service information",
                "Billing information",
                "Shipping/delivery information",
                "Transaction amount & status",
                "Transaction/reference ID"
              ]} />
              <p>Payments may be processed by third-party payment providers. We do not intentionally store complete payment card numbers, CVV numbers, UPI PINs, or banking passwords on our servers.</p>

              <SubHeading>F. Device and Technical Information</SubHeading>
              <p>We may automatically collect certain technical information, including:</p>
              <List items={[
                "Device model & IP address",
                "Operating system and version",
                "Application version",
                "Device identifiers where permitted",
                "Network information",
                "Crash reports & Diagnostic data"
              ]} />

              <SubHeading>G. Usage Information</SubHeading>
              <p>We may collect information about how you interact with the Service, such as:</p>
              <List items={[
                "Features used",
                "Pages/screens viewed",
                "Actions performed",
                "Approximate usage times",
                "Error and crash information"
              ]} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>2. How We Use Information</SectionHeading>
              <p>We may use collected information to:</p>
              <List items={[
                "Provide and operate the Service",
                "Create and manage user accounts",
                "Provide restaurant-related features",
                "Display restaurant information and services",
                "Provide location-based functionality",
                "Enable Bluetooth and Wi-Fi related features",
                "Process food orders, purchases, and registrations",
                "Provide customer support",
                "Prevent fraud, abuse, and unauthorized activity",
                "Maintain application and network security",
                "Diagnose technical problems",
                "Improve application performance",
                "Develop new features",
                "Comply with applicable laws and legal obligations"
              ]} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>3. Permissions</SectionHeading>
              <p>The application may request certain Android permissions depending on the features you use.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                {[
                  { title: "Location Permission", desc: "Used for location-based features and nearby services/events." },
                  { title: "Bluetooth Permission", desc: "Used to discover or communicate with compatible Bluetooth devices when required by supported features." },
                  { title: "Wi-Fi/Network Permission", desc: "Used to provide network-dependent functionality and determine network connectivity." },
                  { title: "Camera/Photos Permission", desc: "If applicable, used when you choose to capture or upload profile photographs, documents, or other content." }
                ].map((perm, i) => (
                  <div key={i} style={{ background: '#f9f9fb', padding: '20px', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#111', fontSize: '16px' }}>{perm.title}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '15px' }}>{perm.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>4. Data Sharing</SectionHeading>
              <p>We may share information with trusted service providers that help us operate the Service, such as:</p>
              <List items={[
                "Cloud hosting providers",
                "Payment processors",
                "Analytics & crash-reporting providers",
                "Delivery or logistics providers",
                "Customer-support providers",
                "Security & fraud-prevention providers"
              ]} />
              <p>We do not sell personal information to third parties.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>5. Payment Information</SectionHeading>
              <p>Payments may be processed through third-party payment service providers. When you make a payment, your payment information may be transmitted directly to the applicable payment provider through secure channels.</p>
              <p>We may receive transaction-related information such as Transaction ID, Payment status, Amount, Order ID, and Payment method type. We do not request or intentionally store your payment PIN, CVV, or complete card credentials.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>6. Data Security</SectionHeading>
              <p>We take reasonable technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. Security measures may include encryption during transmission, access controls, authentication mechanisms, secure server infrastructure, and monitoring. However, no internet transmission or electronic storage system can be guaranteed to be completely secure.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>7. Data Retention & Deletion</SectionHeading>
              <p>We retain personal information only for as long as reasonably necessary to provide the Service, maintain your account, complete transactions, or meet legal requirements.</p>
              <p>You may request deletion of your Hotel Tandoor Corner account and associated personal information. To request deletion, please use our Account Deletion page. When a deletion request is received, we will process the request in accordance with applicable laws.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>8. Additional Policies</SectionHeading>
              <SubHeading>Children's Privacy</SubHeading>
              <p>The Service is not intended to knowingly collect personal information from children in violation of applicable laws. If a parent or guardian believes that a child has provided personal information without appropriate consent, please contact us.</p>
              
              <SubHeading>Third-Party Services</SubHeading>
              <p>The application may use third-party services for functionality (hosting, payment processing, maps, analytics, etc.). These third-party providers may process information according to their own privacy policies.</p>

              <SubHeading>Cookies and Similar Technologies</SubHeading>
              <p>Our website may use cookies and similar technologies to maintain sessions, remember preferences, improve functionality, and understand usage. You may control cookies through your browser settings.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>9. Contact Us</SectionHeading>
              <p>If you have questions about this Privacy Policy, data practices, or account/data deletion, contact us:</p>
              
              <div style={{ 
                marginTop: '32px',
                padding: '40px',
                background: 'linear-gradient(135deg, #111, #222)',
                color: '#fff',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(170,59,255,0.2) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }}></div>
                
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 24px 0', color: '#fff' }}>Hotel Tandoor Corner</h3>
                
                <div style={{ display: 'grid', gap: '16px', position: 'relative', zIndex: 1 }}>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#aaa', width: '100px' }}>Company:</span>
                    <span>Dhion Technology powered by Devlanecorp</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#aaa', width: '100px' }}>Address:</span>
                    <span>Plot No. 92, Shree Tatyaso Mohite Housing Society, Kalmba Road, Kolhapur, Maharashtra - 416012</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ color: '#aaa', width: '100px' }}>Email:</span>
                    <a href="mailto:support@dhion.in" style={{ color: '#FF6B4A', textDecoration: 'none', fontWeight: '500' }}>support@dhion.in</a>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#aaa', width: '100px' }}>Phone:</span>
                    <span>+91-7721888623 | +91-7057027171</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
