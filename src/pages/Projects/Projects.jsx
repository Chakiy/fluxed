import Footer from "../../components/Footer/Footer";
import "./Projects.css";
import { Link } from "react-router-dom";

const projects = [
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
  {
    id: 4,
    title: "SUMMER RING",
    material: "SILVER 925",
    description:
      "A ring that always brings back memories of warm days and late breakfasts with those you love.",
    image: "/images/summer.png",
  },
  {
    id: 5,
    title: "SUMMER RING",
    material: "SILVER 925",
    description:
      "A ring that always brings back memories of warm days and late breakfasts with those you love.",
    image: "/images/summer.png",
  },
  {
    id: 6,
    title: "SUMMER RING",
    material: "SILVER 925",
    description:
      "A ring that always brings back memories of warm days and late breakfasts with those you love.",
    image: "/images/summer.png",
  },
];

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
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-top">
                <span className="project-name">{project.title}</span>
                <span className="project-material">{project.material}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <Link to="/project" className="project-image-wrap">
                <img
                  src={project.image}
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
