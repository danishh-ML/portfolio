import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certification' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled ? 'var(--navbar-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid var(--navbar-border)' : '1px solid transparent',
          transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        {/* Scroll progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${scrollProgress}%`,
            background: 'var(--gradient-accent)',
            transition: 'width 0.15s linear',
          }}
        />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 700,
                padding: '8px 0',
              }}
            >
              <span className="gradient-text">MD Danish Khan</span>
            </button>

            {/* Desktop links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hidden md:flex">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  style={{
                    position: 'relative',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '10px',
                    border: 'none',
                    background: activeSection === id ? 'var(--gradient-subtle)' : 'transparent',
                    color: activeSection === id ? 'var(--text-accent)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== id) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.background = 'var(--gradient-subtle)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== id) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      layoutId="activeNav"
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: '2px',
                        width: '60%',
                        borderRadius: '2px',
                        background: 'var(--gradient-accent)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}

              {/* Separator */}
              <div style={{ width: '1px', height: '24px', background: 'var(--border-primary)', margin: '0 8px' }} />

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-primary)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
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
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex' }}
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>

            {/* Mobile controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="flex md:hidden">
              <button
                onClick={toggleTheme}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '40px', height: '40px', borderRadius: '10px',
                  border: '1px solid var(--border-primary)', background: 'transparent',
                  color: 'var(--text-secondary)', cursor: 'pointer',
                }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '40px', height: '40px', borderRadius: '10px',
                  border: '1px solid var(--border-primary)', background: 'transparent',
                  color: 'var(--text-primary)', cursor: 'pointer',
                }}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 40, backgroundColor: 'rgba(0,0,0,0.6)' }}
              className="md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="md:hidden"
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px', zIndex: 50,
                backgroundColor: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-primary)',
                padding: '80px 24px 24px',
              }}
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px', borderRadius: '10px',
                  border: 'none', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer',
                }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map(({ id, label }, index) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(id)}
                    style={{
                      textAlign: 'left', padding: '14px 16px', borderRadius: '12px',
                      fontSize: '15px', fontWeight: 500, border: 'none', cursor: 'pointer',
                      color: activeSection === id ? 'var(--text-accent)' : 'var(--text-secondary)',
                      background: activeSection === id ? 'var(--gradient-subtle)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
