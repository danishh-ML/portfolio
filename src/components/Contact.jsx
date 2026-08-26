import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, User, AtSign, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalInfo } from '../data/personalInfo';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

const contactMethods = [
  { label: 'Email', value: personalInfo.contact.email, href: personalInfo.contact.emailLink, icon: Mail, color: '#818cf8' },
  { label: 'Phone', value: personalInfo.contact.phone, href: personalInfo.contact.phoneLink, icon: Phone, color: '#22c55e' },
  { label: 'GitHub', value: personalInfo.social.githubUsername, href: personalInfo.social.github, icon: GithubIcon, color: '#c084fc', external: true },
  { label: 'LinkedIn', value: personalInfo.social.linkedinName, href: personalInfo.social.linkedin, icon: LinkedinIcon, color: '#0077b5', external: true },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const messages = JSON.parse(localStorage.getItem('portfolio-messages') || '[]');
    messages.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('portfolio-messages', JSON.stringify(messages));
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const inputStyle = (hasError) => ({
    width: '100%', padding: '14px 18px', borderRadius: '14px', fontSize: '14px',
    backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)',
    border: hasError ? '1px solid #ef4444' : '1px solid var(--border-primary)',
    outline: 'none', fontFamily: 'inherit', transition: 'all 0.25s ease',
  });

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <SectionHeading
          title="Let's Connect"
          subtitle="Interested in technology, AI, and building meaningful solutions. Feel free to connect with me."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', maxWidth: '1040px', margin: '0 auto' }} className="lg:!grid-cols-2 lg:!gap-[48px]">
          {/* Contact methods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {contactMethods.map((method, index) => (
              <ScrollReveal key={method.label} animation="fade-right" delay={index * 0.08}>
                <a
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="glass-card"
                  style={{
                    padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '18px',
                    textDecoration: 'none', boxShadow: 'var(--shadow-card)',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    backgroundColor: `${method.color}15`, border: `1px solid ${method.color}25`,
                  }}>
                    <method.icon size={22} style={{ color: method.color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                      {method.label}
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {method.value}
                    </p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact form */}
          <ScrollReveal animation="fade-left" delay={0.2}>
            <div className="glass-card" style={{ padding: '36px', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '28px' }}>
                Send a Message
              </h3>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', textAlign: 'center' }}
                  >
                    <CheckCircle size={52} style={{ color: '#22c55e', marginBottom: '20px' }} />
                    <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                      Message Saved!
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Thank you for reaching out. Backend integration coming soon — in the meantime, feel free to email me directly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} noValidate>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div>
                        <label htmlFor="contact-name" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                          <User size={14} /> Name
                        </label>
                        <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange}
                          style={inputStyle(errors.name)} placeholder="Your name"
                          onFocus={(e) => { if (!errors.name) e.target.style.borderColor = 'var(--text-accent)'; }}
                          onBlur={(e) => { if (!errors.name) e.target.style.borderColor = 'var(--border-primary)'; }}
                        />
                        {errors.name && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-email" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                          <AtSign size={14} /> Email
                        </label>
                        <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange}
                          style={inputStyle(errors.email)} placeholder="your.email@example.com"
                          onFocus={(e) => { if (!errors.email) e.target.style.borderColor = 'var(--text-accent)'; }}
                          onBlur={(e) => { if (!errors.email) e.target.style.borderColor = 'var(--border-primary)'; }}
                        />
                        {errors.email && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-message" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                          <MessageSquare size={14} /> Message
                        </label>
                        <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows={4}
                          style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: '120px' }} placeholder="Your message..."
                          onFocus={(e) => { if (!errors.message) e.target.style.borderColor = 'var(--text-accent)'; }}
                          onBlur={(e) => { if (!errors.message) e.target.style.borderColor = 'var(--border-primary)'; }}
                        />
                        {errors.message && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>{errors.message}</p>}
                      </div>

                      <button type="submit" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        width: '100%', padding: '16px', borderRadius: '14px',
                        fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer',
                        background: 'var(--gradient-accent)', color: '#fff',
                        boxShadow: '0 6px 24px rgba(99,102,241,0.25)', transition: 'all 0.3s ease',
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 10px 36px rgba(99,102,241,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        <Send size={18} /> Send Message
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
