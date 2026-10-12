 import React, { useState } from 'react';
import { sendContactMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ status: null, message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ status: null, message: '' });

    try {
      const response = await sendContactMessage(formData);
      setFeedback({
        status: 'success',
        message: response.message || 'Message sent successfully! Harsh will reply soon.'
      });
      // Clear form
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setFeedback({
        status: 'error',
        message: err.message || 'Failed to send message. Please try again later.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">// 04. Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <div className="section-divider"></div>
          <p className="section-lead">
            Have a question, an opportunity, or want to collaborate? Send me a message and I'll get back to you!
          </p>
        </div>

        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          
          {/* Left: Contact Info */}
          <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: 600 }}>
              Let's Connect
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              I am currently pursuing my B.Tech in CSE at <strong>Jaypee University Anoopshahr</strong> (3rd Semester, 9.0 CGPA). 
              Feel free to reach out for software projects, internships, or open-source collaboration.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Email
                </span>
                <p style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                  <a href="mailto:guptaharsh90211@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                    guptaharsh90211@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Profiles
                </span>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem' }}>
                  <a
                    href="https://github.com/Harshgupta90211"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/harsh-gupta-611644377"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="contact-form-container" style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}>
            <form action="https://formspree.io/f/xyekjodw" method="POST" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Feedback Alert */}
              {feedback.status === 'success' && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  color: '#86efac',
                  fontSize: '0.9rem'
                }}>
                  ✅ {feedback.message}
                </div>
              )}

              {feedback.status === 'error' && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fca5a5',
                  fontSize: '0.9rem'
                }}>
                  ⚠️ {feedback.message}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write your message here..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {submitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
