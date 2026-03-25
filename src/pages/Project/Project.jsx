import Footer from "../../components/Footer/Footer";
import "./Project.css";
import { useParams, Link } from "react-router-dom";
import projectsData from "../../data/projectsData";

function Project() {
  const { id } = useParams();

  const project = projectsData.find((item) => item.id === Number(id));

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
      <section className="container project-section">
        <div className="project-container">
          <div className="project-top">
            <div className="project-meta-left">
              <span>SUMMER RING</span>
              <span>SILVER 925</span>
            </div>

            <div className="project-header">
              <h1>ANDERS DESIGN</h1>
              <div className="project-header-line" />
              <p>
                A ring that always brings back memories of warm days and late
                breakfasts with those you love.
              </p>
            </div>

            <div className="project-badge">
              <img src="/images/w5.png" alt="Project badge" />
            </div>
          </div>

          <div className="project-gallery">
            <div className="gallery-item gallery-item-large">
              <img src={project.image} alt="Project main visual" />
            </div>

            <div className="gallery-row gallery-row-two">
              <div className="gallery-item">
                <img src={project.image} alt="Project visual 1" />
              </div>
              <div className="gallery-item">
                <img src={project.image} alt="Project visual 2" />
              </div>
            </div>

            <div className="gallery-row gallery-row-three">
              <div className="gallery-item">
                <img src={project.image} alt="Project visual 3" />
              </div>
              <div className="gallery-item">
                <img src={project.image} alt="Project visual 4" />
              </div>
              <div className="gallery-item">
                <img src={project.image} alt="Project visual 5" />
              </div>
            </div>

            <div className="gallery-item gallery-item-bottom">
              <img src={project.image} alt="Project bottom visual" />
            </div>
          </div>

          <div className="project-cta">
            <h2>
              CONNECT WITH US TO EXPLORE YOUR
              <br />
              PROJECT&apos;S POTENTIAL.
            </h2>

            <button className="project-cta-btn">contact here</button>
          </div>

          <div className="project-divider" />

          <div className="other-projects">
            <h3>other projects</h3>

            <div className="other-projects-grid">
              <article className="other-project-card" key={project.id}>
                <div className="other-project-card-top">
                  <span>{project.title}</span>
                  <span>{project.material}</span>
                </div>

                <p>{project.description}</p>

                <div className="other-project-image">
                  <img src={project.image} alt={project.title} />
                </div>
              </article>
              <article className="other-project-card" key={project.id}>
                <div className="other-project-card-top">
                  <span>{project.title}</span>
                  <span>{project.material}</span>
                </div>

                <p>{project.description}</p>

                <div className="other-project-image">
                  <img src={project.image} alt={project.title} />
                </div>
              </article>
              <article className="other-project-card" key={project.id}>
                <div className="other-project-card-top">
                  <span>{project.title}</span>
                  <span>{project.material}</span>
                </div>

                <p>{project.description}</p>

                <div className="other-project-image">
                  <img src={project.image} alt={project.title} />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Project;
