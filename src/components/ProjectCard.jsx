import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, Tag, Calendar, Wrench, Info } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="glass-card"
        style={{
          overflow: 'hidden', boxShadow: 'var(--shadow-card)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
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
        {/* Color accent bar */}
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${project.color}, ${project.color}66)` }} />

        <div style={{ padding: '28px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              {/* Badges row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                  backgroundColor: `${project.color}15`, color: project.color,
                  border: `1px solid ${project.color}30`,
                }}>
                  <Tag size={11} />
                  {project.category}
                </span>
                {project.isConceptProject && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                    backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b',
                    border: '1px solid rgba(245,158,11,0.2)',
                  }}>
                    <Info size={11} />
                    Concept
                  </span>
                )}
                {project.date && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    <Calendar size={11} />
                    {project.date}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '20px' }}>
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 500,
                    background: 'var(--gradient-subtle)', color: 'var(--text-accent)',
                    border: '1px solid var(--border-accent)', transition: 'all 0.2s ease',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Expand button */}
          {(project.features.length > 0 || project.longDescription || project.tools) && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '14px', fontWeight: 500, color: 'var(--text-accent)',
                background: 'none', border: 'none', cursor: 'pointer',
                marginBottom: '16px', padding: '4px 0', transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.75'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              aria-expanded={expanded}
            >
              {expanded ? 'Show Less' : 'View Details'}
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}

          {/* Expandable details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-primary)' }}>
                  {project.longDescription && (
                    <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '20px' }}>
                      {project.longDescription}
                    </p>
                  )}

                  {project.features.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                        Key Features
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {project.features.map((feature, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                            <span style={{ marginTop: '8px', width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, backgroundColor: project.color }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.tools?.length > 0 && (
                    <div>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                        <Wrench size={14} />
                        Tools Explored
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.tools.map((tool) => (
                          <span key={tool} style={{
                            padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 500,
                            background: 'var(--gradient-subtle)', color: 'var(--text-secondary)',
                            border: '1px solid var(--border-primary)',
                          }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 500,
                  textDecoration: 'none', color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)', transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.color = 'var(--text-accent)';
                  e.currentTarget.style.background = 'var(--gradient-subtle)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <GithubIcon size={16} />
                GitHub
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 500,
                  textDecoration: 'none', background: 'var(--gradient-accent)', color: '#fff',
                }}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
