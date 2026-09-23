import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="section-label">ABOUT HAVENLY</p>

        <h1>
          Designing spaces
          <br />
          that feel like home.
        </h1>

        <p>
          We connect homeowners with talented interior designers
          <br />
          to make beautiful, personalised spaces easier to create.
        </p>
      </section>

      <section className="about-content">

        <div className="about-block">
          <p className="section-label">OUR PURPOSE</p>

          <h2>
            A better way to
            <br />
            design your space.
          </h2>

          <p>
            Havenly brings customers and interior designers together
            through one simple digital experience. From finding the
            right designer to reviewing designs, managing milestones
            and completing payments, everything stays connected.
          </p>
        </div>

        <div className="about-block about-dark">
          <p className="section-label">OUR EXPERIENCE</p>

          <div className="about-stats">

            <div>
              <strong>100+</strong>
              <span>Design projects</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Designers</span>
            </div>

            <div>
              <strong>10+</strong>
              <span>Design styles</span>
            </div>

          </div>
        </div>

      </section>

      <section className="about-cta">

        <p className="section-label">READY TO START?</p>

        <h2>
          Create a space
          <br />
          you'll love.
        </h2>

        <Link
          to="/create-project"
          className="primary-btn"
        >
          Start Your Project →
        </Link>

      </section>
    </main>
  );
}

export default About;