import "./Blog.css";
import Footer from "../../components/Footer/Footer";

const blogPosts = [
  {
    id: 1,
    title: "SUMMER RING",
    material: "SILVER 925",
    image: "/images/summer.png",

    badge: true,
  },
  {
    id: 2,
    title: "SUMMER RING",
    material: "SILVER 925",
    image: "/images/summer.png",

    badge: false,
  },
  {
    id: 3,
    title: "SUMMER RING",
    material: "SILVER 925",
    image: "/images/summer.png",

    badge: true,
  },
  {
    id: 4,
    title: "SUMMER RING",
    material: "SILVER 925",
    image: "/images/summer.png",
    badge: false,
  },
  {
    id: 5,
    title: "SUMMER RING",
    material: "SILVER 925",
    image: "/images/summer.png",

    badge: false,
  },
  {
    id: 6,
    title: "SUMMER RING",
    material: "SILVER 925",
    image: "/images/summer.png",

    badge: false,
  },
];

function Blog() {
  return (
    <>
      <section className="container blog-page">
        <div className="blog-socials">
          <a href="https://www.instagram.com/fluxed.agency?igsh=MWhkbm9lMXltcjQxNw%3D%3D&utm_source=qr">
            INSTAGRAM
          </a>
          <a href="/">FACEBOOK</a>
          <a href="/">BEHANCE</a>
          <a href="/">LINKEDIN</a>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article className="blog-card" key={post.id}>
              <div className="blog-card-image-wrap">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-card-image"
                />
              </div>

              <div className="blog-card-meta">
                <h3>{post.title}</h3>
                <span>{post.material}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Blog;
