import ScrollReveal from './ScrollReveal';

export default function SectionHeading({ title, subtitle, align = 'center' }) {
  return (
    <ScrollReveal animation="fade-up">
      <div style={{ marginBottom: '56px', textAlign: align }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && (
          <p style={{
            fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6,
            maxWidth: '560px', margin: align === 'center' ? '0 auto' : undefined,
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
