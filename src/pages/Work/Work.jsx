import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

import { Link } from "react-router-dom";
import "./Work.css";
import projectsData from "../../data/projectsData";

function Work() {
  const navigate = useNavigate();
  return (
    <>
      <section className="container work">
        <h2 className="h2">our work</h2>

        <div className="work-grid">
          {/* <div className="work-card">
            <img src="/images/w1.png" />
            <div className="work-info">
              <div className="work-header">
                <span>REDO</span>
                <span>BRANDING</span>
              </div>

              <p>
                Our redesign of Redo's digital presence focused on a streamlined
                user interface and a modern visual identity. Through intuitive
                UX design and a refreshed color palette, we enhanced engagement
                through brand messaging.
              </p>
            </div>
          </div>
          <div className="work-card">
            <img src="/images/w2.png" />
            <div className="work-info">
              <div className="work-header">
                <span>REDO</span>
                <span>BRANDING</span>
              </div>

              <p>
                Our redesign of Redo's digital presence focused on a streamlined
                user interface and a modern visual identity. Through intuitive
                UX design and a refreshed color palette, we enhanced engagement
                through brand messaging.
              </p>
            </div>
          </div>
          <div className="work-card">
            <img src="/images/w3.png" />
            <div className="work-info">
              <div className="work-header">
                <span>REDO</span>
                <span>BRANDING</span>
              </div>

              <p>
                Our redesign of Redo's digital presence focused on a streamlined
                user interface and a modern visual identity. Through intuitive
                UX design and a refreshed color palette, we enhanced engagement
                through brand messaging.
              </p>
            </div>
          </div>
          <div className="work-card">
            <img src="/images/w4.png" />
            <div className="work-info">
              <div className="work-header">
                <span>REDO</span>
                <span>BRANDING</span>
              </div>

              <p>
                Our redesign of Redo's digital presence focused on a streamlined
                user interface and a modern visual identity. Through intuitive
                UX design and a refreshed color palette, we enhanced engagement
                through brand messaging.
              </p>
            </div>
          </div>
          <div className="work-card no-hover">
            <img src="/images/w5.png" />
            <div className="work-info">
              <div className="work-header">
                <span>fluxed as a mark of changes</span>
                <span>2025</span>
              </div>

              <p>
                With each piece crafted to impeccable standards, this collection
                testifies to our quality and creativity.
              </p>
            </div>
          </div>
          <div className="work-card">
            <img src="/images/w6.png" />
            <div className="work-info">
              <div className="work-header">
                <span>REDO</span>
                <span>BRANDING</span>
              </div>

              <p>
                Our redesign of Redo's digital presence focused on a streamlined
                user interface and a modern visual identity. Through intuitive
                UX design and a refreshed color palette, we enhanced engagement
                through brand messaging.
              </p>
            </div>
          </div> */}

          {projectsData.map((project) => {
            const isClickable = project.clickable !== false;

            return isClickable ? (
              <Link
                to={`/project/${project.slug}`}
                className="work-card"
                key={project.id}
              >
                <img src={project.cover} />

                <div className="work-info">
                  <div className="work-header">
                    <span>{project.title}</span>
                    <span>{project.material}</span>
                  </div>

                  <p>{project.description}</p>
                </div>
              </Link>
            ) : (
              <div className="work-card no-hover" key={project.id}>
                <img src={project.gotFluxed.src} alt={project.gotFluxed.alt} />

                <div className="work-info">
                  <div className="work-header">
                    <span>{project.title}</span>
                    <span>{project.material}</span>
                  </div>

                  <p>{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="more-projects-container">
          <button
            className="more-projects-btn"
            onClick={() => navigate("/projects")}
          >
            more projects
          </button>
        </div>
      </section>

      <section className="story-section container">
        <p className="story-label">our story</p>

        <h2 className="story-title">ELEVATE YOUR BRAND</h2>

        <div className="story-list">
          <div className="story-item">
            <div className="story-header">
              <span>UNLIMITED</span>
              <span>#01</span>
            </div>

            <p>1M+ Users and visitors interacted with our websites</p>
          </div>

          <div className="story-item">
            <div className="story-header">
              <span>ENDLESS CARE</span>
              <span>#02</span>
            </div>

            <p>Active campaigns for multiple companies and brands</p>
          </div>

          <div className="story-item">
            <div className="story-header">
              <span>TRUST</span>
              <span>#03</span>
            </div>

            <p>Different clients have sought our expertise</p>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="cta-top container">
          <h2 className="cta-title">LET’S BUILD TOGETHER</h2>

          <Link to="/contact" className="more-projects-btn">
            contact here
          </Link>
        </div>

        <div className="cta-image">
          <img src="/images/team.png" alt="team" />
        </div>
      </section>
      {/* <section className="services-section container">
        <p className="services-label">our story</p>

        <h2 className="services-title">CREATIVE SERVICES</h2>

        <div className="services-line"></div>

        <p className="services-text">
          Thoughtful design solutions crafted to bring ideas to life — blending
          creativity, clarity, and visual impact.
        </p>
      </section> */}

      <Footer />
    </>
  );
}

export default Work;
