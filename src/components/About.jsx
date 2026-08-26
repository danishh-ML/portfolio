import { motion } from 'framer-motion';
import { GraduationCap, Target, Sparkles, MapPin } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

const statCards = [
  { label: 'CGPA', value: personalInfo.cgpa, icon: GraduationCap },
  { label: 'Specialization', value: 'CSE (AI/ML)', icon: Sparkles },
  { label: 'University', value: 'LPU', icon: MapPin },
  { label: 'B.Tech', value: '2025–2029', icon: Target },
];

export default function About() {
  const paragraphs = personalInfo.about.split('\n\n');

  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <SectionHeading
          title="About Me"
          subtitle="Getting to know the person behind the code"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="lg:!grid-cols-[3fr_2fr] lg:!gap-[48px]">
          {/* Text content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <ScrollReveal animation="fade-right">
              <div
                className="glass-card"
                style={{ padding: '32px', boxShadow: 'var(--shadow-card)' }}
              >
                <h3
                  style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', color: 'var(--text-accent)' }}
                >
                  Who I Am
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {paragraphs.map((p, i) => (
                    <p
                      key={i}
                      style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)' }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={0.15}>
              <div
                className="glass-card"
                style={{ padding: '32px', boxShadow: 'var(--shadow-card)' }}
              >
                <h3
                  style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', color: 'var(--text-accent)' }}
                >
                  Current Focus
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {personalInfo.currentFocus.map((focus) => (
                    <span
                      key={focus}
                      style={{
                        padding: '10px 20px', borderRadius: '12px',
                        fontSize: '14px', fontWeight: 500,
                        background: 'var(--gradient-subtle)',
                        color: 'var(--text-accent)',
                        border: '1px solid var(--border-accent)',
                      }}
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={0.3}>
              <div
                className="glass-card"
                style={{ padding: '32px', boxShadow: 'var(--shadow-card)' }}
              >
                <h3
                  style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-accent)' }}
                >
                  Career Goal
                </h3>
                <p style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }} className="gradient-text">
                  {personalInfo.careerGoal}
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  {personalInfo.longTermGoal}
                </p>

                <div style={{ marginTop: '28px', paddingTop: '28px', borderTop: '1px solid var(--border-primary)' }}>
                  <h4
                    style={{
                      fontSize: '12px', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '1.5px', marginBottom: '10px', color: 'var(--text-tertiary)',
                    }}
                  >
                    What Motivates Me
                  </h4>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                    &ldquo;{personalInfo.motivation}&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {statCards.map(({ label, value, icon: Icon }, index) => (
              <ScrollReveal key={label} animation="fade-left" delay={index * 0.1}>
                <div
                  className="glass-card"
                  style={{
                    padding: '24px', display: 'flex', alignItems: 'center', gap: '20px',
                    boxShadow: 'var(--shadow-card)', transition: 'all 0.35s ease', cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0, width: '56px', height: '56px', borderRadius: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--gradient-subtle)', border: '1px solid var(--border-accent)',
                    }}
                  >
                    <Icon size={24} style={{ color: 'var(--text-accent)' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: 700 }} className="gradient-text">{value}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
