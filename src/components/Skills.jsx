import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { skillCategories } from '../data/skills';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

function getIcon(iconName) {
  return LucideIcons[iconName] || LucideIcons.Code;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('programming');
  const activeSkills = skillCategories.find((c) => c.id === activeCategory)?.skills || [];

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies and tools I currently work with"
        />

        {/* Category tabs */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '10px', marginBottom: '48px',
          }}>
            {skillCategories.map(({ id, label, icon }) => {
              const Icon = getIcon(icon);
              const isActive = activeCategory === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px', borderRadius: '14px',
                    fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                    border: isActive ? 'none' : '1px solid var(--border-primary)',
                    background: isActive ? 'var(--gradient-accent)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 6px 24px rgba(99,102,241,0.25)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.borderColor = 'var(--border-accent)';
                      e.currentTarget.style.background = 'var(--gradient-subtle)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-primary)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '16px',
            }}
          >
            {activeSkills.map((skill, index) => {
              const SkillIcon = getIcon(skill.icon);
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  className="glass-card"
                  style={{
                    padding: '20px 16px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '14px', textAlign: 'center',
                    boxShadow: 'var(--shadow-card)', transition: 'all 0.35s ease', cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: '44px', height: '44px', borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--gradient-subtle)', border: '1px solid var(--border-accent)',
                    }}
                  >
                    <SkillIcon size={20} style={{ color: 'var(--text-accent)' }} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
