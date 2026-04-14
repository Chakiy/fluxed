import Footer from "../../components/Footer/Footer";
import "./Project.css";
import { useParams, Link } from "react-router-dom";
import projectsData from "../../data/projectsData";
import FluxedMode from "../../components/FluxedMode/FluxedMode";

function Project() {
  const { slug } = useParams();

  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    return (
      <>
        <section className="project-page">
          <h1>Project not found</h1>
          <Link to="/projects" className="back-link">
            Back to projects
          </Link>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* <FluxedMode /> */}
      <section className="container project-section">
        <div className="project-container">
          <div className="project-top">
            <div className="project-meta-left">
              <span>{project.material[0]}</span>
              <span>{project.material[1]}</span>
            </div>

            <div className="project-header">
              <h1>{project.title}</h1>
              <div className="project-header-line" />
              <p>{project.description}</p>
            </div>

            <div className="project-badge">
              <img src="/images/w5.png" alt={project.title} />
            </div>
          </div>

          <div className="project-gallery">
            {project.rows?.slice(0, 7).map((row, rowIndex) => {
              const safeImages = row.slice(0, 3);

              return (
                <div
                  key={rowIndex}
                  className={`project-gallery-row row-${safeImages.length}`}
                >
                  {safeImages.map((image) => (
                    <div className="project-gallery-item" key={image.id}>
                      <img src={image.src} alt={image.alt || project.title} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="project-cta">
            <h2>
              CONNECT WITH US TO EXPLORE YOUR PROJECT&apos;S POTENTIAL.
              <Link to="/contact" className="project-cta-btn">
                contact here
              </Link>{" "}
            </h2>
          </div>

          <div className="other-projects">
            <h3>other projects</h3>

            <div className="other-projects-grid">
              {projectsData
                .filter((item) => item.id !== project.id)
                .slice(0, 3)
                .map((item) => (
                  <article className="other-project-card" key={item.id}>
                    <Link
                      to={`/project/${item.slug}`}
                      className="other-project-link"
                    >
                      <div className="other-project-card-top">
                        <span>{item.title}</span>
                        <span>{item.material[0]}</span>
                      </div>

                      {/* <p>{item.description}</p> */}

                      <div className="other-project-image">
                        <img src={item.cover} alt={item.title} />
                      </div>
                    </Link>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Project;
