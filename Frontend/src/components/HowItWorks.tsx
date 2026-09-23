function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Find your designer",
      description:
        "Browse verified interior designers and discover a style that feels right for your home.",
    },
    {
      number: "02",
      title: "Share your vision",
      description:
        "Tell your designer about your space, preferences, budget, and everything you want to create.",
    },
    {
      number: "03",
      title: "Bring it to life",
      description:
        "Review designs, share feedback, approve ideas, and watch your dream space come together.",
    },
  ]

  return (
    <section className="how-it-works">
      <div className="how-header">
        <h2>
          From idea to
          <br />
          beautiful space.
        </h2>

        <p>
          A simple way to connect with the right designer
          <br />
          and create a home that feels completely yours.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <div className="step-card" key={step.number}>
            <span className="step-number">{step.number}</span>

            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks