import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Tell us about your space",
    description:
      "Share your project details, preferences, budget and what you want to create.",
  },
  {
    number: "02",
    title: "Find your designer",
    description:
      "Explore designers, compare their styles and portfolios, and choose the right creative partner.",
  },
  {
    number: "03",
    title: "Review your proposal",
    description:
      "Connect with your designer, review the quotation and decide how you want to proceed.",
  },
  {
    number: "04",
    title: "Bring your design to life",
    description:
      "Review design versions, request changes, track milestones and manage payments.",
  },
];

function HowItWorks() {
  return (
    <main className="how-it-works-page">

      {/* HERO */}
      <section className="how-it-works-hero">
        <p className="section-label">HOW IT WORKS</p>

        <h1>
          From idea
          <br />
          to beautiful space.
        </h1>

        <p>
          A simple journey that connects you with the right designer
          <br />
          and helps you create a space that feels like you.
        </p>
      </section>


      {/* STEPS */}
      <section className="how-it-works-section">

        <div className="how-it-works-heading">
          <div>
            <p className="section-label">THE PROCESS</p>
            <h2>Designed around you.</h2>
          </div>
        </div>

        <div className="how-steps">

          {steps.map((step) => (
            <article
              className="how-step"
              key={step.number}
            >
              <span className="how-step-number">
                {step.number}
              </span>

              <div className="how-step-content">
                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            </article>
          ))}

        </div>

      </section>


      {/* CTA */}
      <section className="how-it-works-cta">

        <p className="section-label">READY WHEN YOU ARE</p>

        <h2>
          Let's create
          <br />
          something beautiful.
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

export default HowItWorks;