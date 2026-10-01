import React from 'react';
import { motion } from 'framer-motion';
import { usePageTitle } from '../hooks/usePageTitle';

export default function TermsService() {
  usePageTitle('Terms of Service');

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
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B4A, #aa3bff)' }}></div>
      {children}
    </h2>
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
          <svg style={{ flexShrink: 0, marginTop: '2px', color: '#FF6B4A' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
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
              Terms & Conditions
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', color: '#666', fontSize: '15px' }}>
              <p><strong>Last Updated:</strong> September 2026</p>
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
                Welcome to <strong>Dhion Technology</strong> (“Dhion Technology,” “we,” “our,” or “us”).
              </p>
              
              <p style={{ marginTop: '24px', marginBottom: 0, fontStyle: 'italic', color: '#666' }}>
                By accessing or using our website or services, you agree to comply with these Terms & Conditions. If you do not agree with these terms, please discontinue using our website or services.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Our Services</SectionHeading>
              <p>Dhion Technology provides software and technology services, including web development, mobile application development, software development, UI/UX design, AI solutions, digital solutions, and related IT services.</p>
              <p>Project scope, features, timelines, pricing, and deliverables will be based on the applicable quotation, proposal, or agreement between Dhion Technology and the client.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Project Development</SectionHeading>
              <p>We make reasonable efforts to develop and deliver projects according to the agreed requirements.</p>
              <p>Project timelines may be affected by changes in requirements, delayed client approvals, third-party services, hosting issues, API issues, payment gateways, or other circumstances outside our reasonable control.</p>
              <p>Any additional requirements or changes outside the agreed scope may require additional time and charges.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Third-Party Services</SectionHeading>
              <p>Our projects may use third-party services such as:</p>
              <List items={[
                "Hosting and cloud services",
                "Payment gateways",
                "APIs",
                "Google services",
                "Maps and location services",
                "Notification services",
                "Analytics services",
                "Other external software or platforms"
              ]} />
              <p>We cannot guarantee the continuous availability, performance, security, or functionality of third-party services.</p>
              <p style={{ background: '#fff5f2', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #FF6B4A', color: '#d94b26', fontSize: '15px' }}>
                If an issue occurs because of a third-party service, API, hosting provider, payment gateway, or external platform, Dhion Technology will make reasonable efforts to investigate and resolve the issue, but we cannot be held responsible for problems caused by the third-party provider.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Client Responsibilities</SectionHeading>
              <p>Clients are responsible for providing accurate requirements, content, information, credentials, approvals, and other materials required for the project.</p>
              <p>Clients are also responsible for ensuring that the information and content they provide does not violate any applicable law or third-party rights.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Payments</SectionHeading>
              <p>Payments must be made according to the agreed quotation, invoice, or project agreement.</p>
              <p>Delayed payments may result in delays or suspension of development and support services.</p>
              <p>Additional work outside the agreed project scope may be charged separately.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Intellectual Property</SectionHeading>
              <p>Project ownership and rights will be handled according to the applicable project agreement.</p>
              <p>Unless otherwise agreed in writing, Dhion Technology retains ownership of its pre-existing code, frameworks, libraries, reusable components, tools, and development methods.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Security and Misuse</SectionHeading>
              <p>We take reasonable measures to maintain the security and reliability of our services. However, we cannot guarantee complete protection against issues caused by third-party systems, unauthorized access, malware, user misuse, hosting providers, or other external factors.</p>
              <p>Users and clients must not attempt to misuse, damage, attack, or gain unauthorized access to our systems or software.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Limitation of Liability</SectionHeading>
              <p>Dhion Technology will make reasonable efforts to provide reliable and functional services. However, we shall not be responsible for losses, damages, downtime, or service interruptions caused by third-party providers, external APIs, hosting providers, payment gateways, internet/network failures, client actions, or circumstances outside our reasonable control.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Confidentiality</SectionHeading>
              <p>We respect the confidentiality of information shared by our clients. We will not intentionally disclose confidential client information to unauthorized third parties except where required by law or where necessary to provide the agreed services.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Termination</SectionHeading>
              <p>We reserve the right to suspend or terminate services if a client violates these Terms & Conditions, fails to meet payment obligations, misuses our services, or engages in unlawful activities.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Governing Law</SectionHeading>
              <p>These Terms & Conditions shall be governed by the laws of India. Any disputes relating to our services shall be subject to the applicable courts in Kolhapur, Maharashtra, India.</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionHeading>Contact Us</SectionHeading>
              <p>If you have any questions regarding these Terms & Conditions, please contact us:</p>
              
              <div style={{ 
                marginTop: '32px',
                padding: '40px',
                background: 'linear-gradient(135deg, #111, #222)',
                color: '#fff',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,107,74,0.2) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }}></div>
                
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 24px 0', color: '#fff' }}>Dhion Technology</h3>
                
                <div style={{ display: 'grid', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ color: '#aaa', width: '100px' }}>Email:</span>
                    <a href="mailto:support@dhion.in" style={{ color: '#FF6B4A', textDecoration: 'none', fontWeight: '500' }}>support@dhion.in</a>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#aaa', width: '100px' }}>Phone:</span>
                    <span>+91-7721888623 | +91-7057027171</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#aaa', width: '100px' }}>Address:</span>
                    <span>Plot No. 92, Shree Tatyaso Mohite Housing Society, Kalmba Road, Kolhapur, Maharashtra - 416012</span>
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
