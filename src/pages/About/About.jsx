import Footer from "../../components/Footer/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./About.css";

function About() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 0.3, 1], ["0%", "-55%", "-55%"]);

  return (
    <>
      <section className="container">
        <h1 className="about-title">CREATIVE SERVICES</h1>

        <p className="about-description">
          Thoughtful design solutions crafted to bring ideas to life — blending
          creativity, clarity, and visual impact.
        </p>
        <section ref={targetRef} className="horizontal-section">
          <div className="sticky-wrapper">
            <motion.div style={{ x }} className="image-track">
              <div className="image-card">
                <img src="/images/i1.png" alt="" />

                <div className="hover-info">
                  <div className="hover-header">
                    <span>SUMMER RING</span>
                    <span>SILVER 925</span>
                  </div>

                  <p>
                    A ring that always brings back memories of warm days and
                    late breakfasts with those you love.
                  </p>
                </div>
              </div>

              <div className="image-card">
                <img src="/images/i2.png" alt="" />
                <div className="hover-info">
                  <div className="hover-header">
                    <span>SUMMER RING</span>
                    <span>SILVER 925</span>
                  </div>

                  <p>
                    A ring that always brings back memories of warm days and
                    late breakfasts with those you love.
                  </p>
                </div>
              </div>

              <div className="image-card">
                <img src="/images/i3.png" alt="" />
                <div className="hover-info">
                  <div className="hover-header">
                    <span>SUMMER RING</span>
                    <span>SILVER 925</span>
                  </div>

                  <p>
                    A ring that always brings back memories of warm days and
                    late breakfasts with those you love.
                  </p>
                </div>
              </div>

              <div className="image-card">
                <img src="/images/i4.png" alt="" />
                <div className="hover-info">
                  <div className="hover-header">
                    <span>SUMMER RING</span>
                    <span>SILVER 925</span>
                  </div>

                  <p>
                    A ring that always brings back memories of warm days and
                    late breakfasts with those you love.
                  </p>
                </div>
              </div>

              <div className="image-card">
                <img src="/images/i5.png" alt="" />
                <div className="hover-info">
                  <div className="hover-header">
                    <span>SUMMER RING</span>
                    <span>SILVER 925</span>
                  </div>

                  <p>
                    A ring that always brings back memories of warm days and
                    late breakfasts with those you love.
                  </p>
                </div>
              </div>

              <div className="image-card">
                <img src="/images/i6.png" alt="" />
                <div className="hover-info">
                  <div className="hover-header">
                    <span>SUMMER RING</span>
                    <span>SILVER 925</span>
                  </div>

                  <p>
                    A ring that always brings back memories of warm days and
                    late breakfasts with those you love.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}

export default About;
