import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../data/personalInfo';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding">
      <div className="section-container">
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications I've earned"
        />

        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          {certifications.map((cert) => (
            <ScrollReveal key={cert.id} animation="scale-in">
              <div
                className="glass-card"
                style={{
                  padding: '36px',
                  marginBottom: '20px',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    'var(--shadow-card-hover)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: '64px',
                      height: '64px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--gradient-accent)',
                      boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
                    }}
                  >
                    <Award size={30} color="#fff" />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '6px',
                      }}
                    >
                      {cert.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--text-accent)',
                        marginBottom: '4px',
                      }}
                    >
                      {cert.organization}
                    </p>

                    <p
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-tertiary)',
                        marginBottom: '12px',
                      }}
                    >
                      {cert.date}
                    </p>

                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--text-accent)',
                          textDecoration: 'none',
                        }}
                      >
                        View Certificate
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}