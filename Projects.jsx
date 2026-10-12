 import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProjects();
        if (isMounted) {
          setProjects(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Could not connect to the backend server.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">// 03. Portfolio</span>
          <h2 className="section-title">My Projects</h2>
          <div className="section-divider"></div>
          <p className="section-lead">
            Featured software project designed and developed by me.
          </p>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--accent-cyan)' }}>
            <p>Loading project from backend API...</p>
          </div>
        )}

        {/* Error State with Retry */}
        {error && !loading && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            margin: '2rem 0'
          }}>
            <p><strong>Connection Error:</strong> {error}</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#cbd5e1' }}>
              Make sure your Express server is running on port 5000 (<code>node server.js</code>).
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-sm btn-outline"
              style={{ marginTop: '1rem' }}
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Dynamic Single Project Layout */}
        {!loading && !error && projects.length > 0 && (
          <div className="projects-single-wrapper">
            {projects.map((project) => (
              <article key={project.id} className="project-card project-card-featured">
                {/* Visual Area */}
                <div className="project-image-box">
                  <div className="project-placeholder-visual project-visual-featured">
                    <span className="preview-badge">{project.category}</span>
                    <div className="placeholder-graphic">
                      <span className="placeholder-icon">🛠️</span>
                      <span className="placeholder-code">&lt;{project.title.replace(/\s+/g, '')} /&gt;</span>
                    </div>
                  </div>
                </div>

                {/* Content Info */}
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {/* Technology Badges */}
                  <div className="project-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="project-tag">{tech}</span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="project-links">
                    {/* Live Demo deployed on GitHub Pages & GitHub Repository */}
                    <a
                      href={project.liveDemoUrl}
                      className="btn btn-sm btn-primary live-demo-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="btn btn-sm btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
