import { motion } from 'framer-motion';
import { Mail, ArrowDown, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalInfo } from '../data/personalInfo';
import HeroCanvas from './HeroCanvas';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '40px',
      }}
    >
      {/* Background canvas */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <HeroCanvas />
      </div>

      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 25% 45%, rgba(99,102,241,0.07) 0%, transparent 55%)',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 75% 25%, rgba(168,85,247,0.05) 0%, transparent 45%)',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative', zIndex: 10, textAlign: 'center',
          padding: '0 24px', maxWidth: '880px', margin: '0 auto', width: '100%',
        }}
      >
        {/* Initials badge */}
        <motion.div variants={childVariants} style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '88px', height: '88px', borderRadius: '24px',
              fontSize: '28px', fontWeight: 800, color: '#fff',
              background: 'var(--gradient-accent)',
              boxShadow: '0 12px 40px rgba(99,102,241,0.35)',
            }}
          >
            {personalInfo.initials}
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={childVariants}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.div variants={childVariants} style={{ marginBottom: '12px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 600,
              color: 'var(--text-accent)',
            }}
          >
            {personalInfo.title}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={childVariants}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: '24px',
          }}
        >
          {personalInfo.subtitle}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={childVariants}
          style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)',
            maxWidth: '640px',
            margin: '0 auto 48px',
            color: 'var(--text-tertiary)',
            lineHeight: 1.7,
          }}
        >
          {personalInfo.heroTagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={childVariants}
          style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'center', gap: '16px', marginBottom: '48px',
          }}
        >
          <button
            onClick={scrollToProjects}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px', borderRadius: '14px',
              fontSize: '15px', fontWeight: 600, border: 'none',
              background: 'var(--gradient-accent)', color: '#fff',
              cursor: 'pointer', transition: 'all 0.3s ease',
              boxShadow: '0 6px 24px rgba(99,102,241,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 36px rgba(99,102,241,0.4)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Explore My Work
            <ArrowDown size={17} />
          </button>

          <a
            href={personalInfo.resumePath}
            download
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px', borderRadius: '14px',
              fontSize: '15px', fontWeight: 600, textDecoration: 'none',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-primary)',
              background: 'transparent', transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-accent)';
              e.currentTarget.style.color = 'var(--text-accent)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'var(--gradient-subtle)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-primary)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <FileDown size={17} />
            Download Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={childVariants}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}
        >
          {[
            { href: personalInfo.social.github, icon: GithubIcon, label: 'GitHub' },
            { href: personalInfo.social.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
            { href: personalInfo.contact.emailLink, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '48px', height: '48px', borderRadius: '14px',
                border: '1px solid var(--border-primary)', textDecoration: 'none',
                color: 'var(--text-secondary)', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-accent)';
                e.currentTarget.style.borderColor = 'var(--border-accent)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                e.currentTarget.style.background = 'var(--gradient-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'transparent';
              }}
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute', bottom: '32px',
          left: '50%', transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--text-tertiary)' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
