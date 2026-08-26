import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalInfo } from '../data/personalInfo';

const socialLinks = [
  { href: personalInfo.social.github, icon: GithubIcon, label: 'GitHub' },
  { href: personalInfo.social.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
  { href: personalInfo.contact.emailLink, icon: Mail, label: 'Email' },
];

export default function Footer() {
  return (
    <footer style={{
      padding: '48px 24px', borderTop: '1px solid var(--border-primary)',
      backgroundColor: 'var(--bg-secondary)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          {/* Name + Title */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }} className="gradient-text">
              {personalInfo.name}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {personalInfo.fullTitle}
            </p>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '44px', height: '44px', borderRadius: '12px',
                  border: '1px solid var(--border-primary)', textDecoration: 'none',
                  color: 'var(--text-secondary)', transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-accent)';
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.background = 'var(--gradient-subtle)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.background = 'transparent';
                }}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-tertiary)' }}>
            © 2026 {personalInfo.name}. Built with
            <Heart size={14} style={{ color: '#ef4444' }} />
          </p>
        </div>
      </div>
    </footer>
  );
}
