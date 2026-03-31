import "./Projects.css";
import { Link } from "react-router-dom";
import projectsData from "../../data/projectsData";
import Footer from "../../components/Footer/Footer";

function Projects() {
  return (
    <>
      <section className="container projects-section">
        <div className="projects-header">
          <h2 className="projects-title">OUR PROJECTS</h2>

          <Link to="/contact" className="projects-contact-btn">
            contact here
          </Link>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-top">
                <span className="project-name">{project.title}</span>
                <span className="project-material">{project.material}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <Link
                to={`/project/${project.slug}`}
                className="project-image-wrap"
              >
                <img
                  src={project.cover}
                  alt={project.title}
                  className="project-image"
                />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Projects;
