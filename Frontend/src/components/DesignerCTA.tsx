import { Link } from "react-router-dom";

function DesignerCTA() {
  return (
    <section className="designer-cta">

      <div className="designer-cta-image">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
          alt="Modern luxury interior"
        />
      </div>

      <div className="designer-cta-content">

        <p className="section-label">
          YOUR SPACE, YOUR STYLE
        </p>

        <h2>
          Ready to create
          <br />
          something beautiful?
        </h2>

        <p className="cta-description">
          Find a designer who understands your vision,
          your lifestyle, and the way you want your space
          to feel.
        </p>

        <Link
          to="/designers"
          className="primary-btn designer-cta-button"
        >
          Find a Designer →
        </Link>

      </div>

    </section>
  );
}

export default DesignerCTA;