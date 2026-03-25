import Footer from "../../components/Footer/Footer";
import "./Project.css";

const galleryImages = [
  "/images/summer.png",
  "/images/summer.png",
  "/images/summer.png",
  "/images/summer.png",
  "/images/summer.png",
  "/images/summer.png",
  "/images/summer.png",
];

const otherProjects = [
  {
    id: 1,
    title: "SUMMER RING",
    material: "SILVER 925",
    description:
      "A ring that always brings back memories of warm days and late breakfasts with those you love.",
    image: "/images/summer.png",
  },
  {
    id: 2,
    title: "SUMMER RING",
    material: "SILVER 925",
    description:
      "A ring that always brings back memories of warm days and late breakfasts with those you love.",
    image: "/images/summer.png",
  },
  {
    id: 3,
    title: "SUMMER RING",
    material: "SILVER 925",
    description:
      "A ring that always brings back memories of warm days and late breakfasts with those you love.",
    image: "/images/summer.png",
  },
];

function Project() {
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
              <img src={galleryImages[0]} alt="Project main visual" />
            </div>

            <div className="gallery-row gallery-row-two">
              <div className="gallery-item">
                <img src={galleryImages[1]} alt="Project visual 1" />
              </div>
              <div className="gallery-item">
                <img src={galleryImages[2]} alt="Project visual 2" />
              </div>
            </div>

            <div className="gallery-row gallery-row-three">
              <div className="gallery-item">
                <img src={galleryImages[3]} alt="Project visual 3" />
              </div>
              <div className="gallery-item">
                <img src={galleryImages[4]} alt="Project visual 4" />
              </div>
              <div className="gallery-item">
                <img src={galleryImages[5]} alt="Project visual 5" />
              </div>
            </div>

            <div className="gallery-item gallery-item-bottom">
              <img src={galleryImages[6]} alt="Project bottom visual" />
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
              {otherProjects.map((project) => (
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
