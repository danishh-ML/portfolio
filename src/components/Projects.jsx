import { projects } from '../data/projects';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <SectionHeading
          title="Projects"
          subtitle="Real projects I've built and concepts I've explored"
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
