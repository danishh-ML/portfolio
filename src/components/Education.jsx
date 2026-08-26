import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { education } from '../data/education';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="section-container">
        <SectionHeading title="Education" subtitle="My academic journey" />

        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px',
            background: 'var(--gradient-accent)', opacity: 0.2,
          }} className="md:!left-1/2 md:!-translate-x-px" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {education.map((item, index) => (
              <ScrollReveal
                key={item.id}
                animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                delay={index * 0.15}
              >
                <div style={{ position: 'relative', paddingLeft: '52px' }} className={`md:!pl-0 ${index % 2 === 0 ? 'md:!pr-[calc(50%+32px)]' : 'md:!pl-[calc(50%+32px)]'}`}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute', left: '14px', top: '28px',
                    width: '14px', height: '14px', borderRadius: '50%', zIndex: 10,
                    background: item.current ? 'var(--gradient-accent)' : 'var(--text-tertiary)',
                    boxShadow: item.current ? '0 0 16px rgba(99,102,241,0.4)' : 'none',
                  }} className="md:!left-1/2 md:!-translate-x-1/2" />

                  {/* Card */}
                  <div
                    className="glass-card"
                    style={{
                      padding: '28px', boxShadow: 'var(--shadow-card)',
                      transition: 'all 0.35s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {item.current && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '5px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                        background: 'rgba(99,102,241,0.1)', color: 'var(--text-accent)',
                        border: '1px solid var(--border-accent)', marginBottom: '16px',
                      }}>
                        <motion.span
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-accent)', display: 'inline-block' }}
                        />
                        Currently Pursuing
                      </span>
                    )}

                    <p style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-accent)', marginBottom: '8px' }}>
                      {item.years}
                    </p>

                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {item.institution}
                    </h3>

                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      <GraduationCap size={15} />
                      {item.degree}
                    </p>

                    {item.field && (
                      <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                        {item.field}
                      </p>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--text-accent)' }}>
                      <Award size={15} />
                      {item.score}
                    </div>
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
