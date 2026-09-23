import { Link } from "react-router-dom";

function CustomerDashboard() {
  const savedProject = localStorage.getItem("projectCreated");
  const savedConsultation = localStorage.getItem("consultationRequest");
  const savedQuotation = localStorage.getItem("quotationStatus");
  const savedDesignReview = localStorage.getItem("designReviewStatus");
  const savedPayment = localStorage.getItem("paymentStatus");

  const project = savedProject ? JSON.parse(savedProject) : null;

  const consultation = savedConsultation
    ? JSON.parse(savedConsultation)
    : null;

  const quotation = savedQuotation
    ? JSON.parse(savedQuotation)
    : null;

  // Design review can be stored either as:
  // "APPROVED"
  // or as a JSON object like { status: "APPROVED" }
  let designReview = null;

  if (savedDesignReview) {
    try {
      designReview = JSON.parse(savedDesignReview);
    } catch {
      designReview = {
        status: savedDesignReview,
      };
    }
  }

  const payment = savedPayment
    ? JSON.parse(savedPayment)
    : null;

  return (
    <main className="dashboard-page">

      {/* HEADER */}
      <section className="dashboard-header">
        <div>
          <p className="section-label">
            CUSTOMER DASHBOARD
          </p>

          <h1>Welcome back.</h1>

          <p>
            Manage your projects, designers, consultations
            and payments.
          </p>
        </div>

        <Link
          to="/create-project"
          className="primary-btn"
        >
          Start New Project
        </Link>
      </section>

      {/* STATS */}
      <section className="dashboard-stats">

        <div className="stat-card">
          <span>ACTIVE PROJECTS</span>
          <strong>
            {project ? 1 : 0}
          </strong>
        </div>

        <div className="stat-card">
          <span>CONSULTATIONS</span>
          <strong>
            {consultation ? 1 : 0}
          </strong>
        </div>

        <div className="stat-card">
          <span>QUOTATION</span>

          <strong>
            {quotation?.status === "ACCEPTED"
              ? "✓"
              : "1"}
          </strong>
        </div>

        <div className="stat-card">
          <span>PAYMENT</span>

          <strong>
            {payment?.status === "PAID"
              ? "PAID"
              : "PENDING"}
          </strong>
        </div>

      </section>

      {/* MAIN CONTENT */}
      <section className="dashboard-content">

        <div className="dashboard-projects">

          {/* PROJECT */}
          <div className="section-heading">
            <div>
              <p className="section-label">
                MY PROJECTS
              </p>

              <h2>
                Recent projects
              </h2>
            </div>
          </div>

          {project ? (
            <div className="project-card">

              <div>
                <span className="project-status">
                  {project.status}
                </span>

                <h3>
                  {project.name}
                </h3>

                <p>
                  Your project · Awaiting designer
                </p>
              </div>

              <div className="project-progress">

                <span>
                  60%
                </span>

                <div>
                  <div
                    style={{
                      width: "60%",
                    }}
                  ></div>
                </div>

              </div>

            </div>
          ) : (
            <div className="project-card">

              <div>
                <span className="project-status">
                  NO PROJECTS
                </span>

                <h3>
                  Start your first project
                </h3>

                <p>
                  Tell us about your space and find the
                  right designer.
                </p>
              </div>

              <Link
                to="/create-project"
                className="primary-btn"
              >
                Create Project →
              </Link>

            </div>
          )}

          {/* CONSULTATIONS */}
          <div className="section-heading dashboard-subheading">
            <div>
              <p className="section-label">
                CONSULTATIONS
              </p>

              <h2>
                My consultations
              </h2>
            </div>
          </div>

          {consultation ? (
            <div className="project-card">

              <div>
                <span className="project-status">
                  {consultation.status}
                </span>

                <h3>
                  {consultation.designer}
                </h3>

                <p>
                  Consultation requested ·{" "}
                  {consultation.date}
                </p>
              </div>

              <span className="consultation-status">
                Awaiting confirmation
              </span>

            </div>
          ) : (
            <div className="project-card">

              <div>
                <span className="project-status">
                  NO CONSULTATIONS
                </span>

                <h3>
                  Find a designer
                </h3>

                <p>
                  Connect with an interior designer for
                  your project.
                </p>
              </div>

              <Link
                to="/designers"
                className="primary-btn"
              >
                Find Designer →
              </Link>

            </div>
          )}

          {/* PROJECT WORKFLOW */}
          <div className="section-heading dashboard-subheading">
            <div>
              <p className="section-label">
                PROJECT WORKFLOW
              </p>

              <h2>
                Manage your project
              </h2>
            </div>
          </div>

          <div className="dashboard-workflow-grid">

            {/* QUOTATION */}
            <Link
              to="/quotation"
              className="workflow-card"
            >
              <span>
                01
              </span>

              <h3>
                Quotation
              </h3>

              <p>
                Review and respond to your designer's
                quotation.
              </p>

              <strong>
                {quotation?.status || "PENDING"} →
              </strong>
            </Link>

            {/* DESIGN REVIEW */}
            <Link
              to="/design-review"
              className="workflow-card"
            >
              <span>
                02
              </span>

              <h3>
                Design Review
              </h3>

              <p>
                Review your latest design and request
                changes.
              </p>

              <strong>
                {designReview?.status || "IN REVIEW"} →
              </strong>
            </Link>

            {/* MILESTONES */}
            <Link
              to="/milestones"
              className="workflow-card"
            >
              <span>
                03
              </span>

              <h3>
                Milestones
              </h3>

              <p>
                Track every stage of your project journey.
              </p>

              <strong>
                View Progress →
              </strong>
            </Link>

            {/* PAYMENTS */}
            <Link
              to="/payments"
              className="workflow-card"
            >
              <span>
                04
              </span>

              <h3>
                Payments
              </h3>

              <p>
                Manage payments and view your invoice.
              </p>

              <strong>
                {payment?.status || "PENDING"} →
              </strong>
            </Link>

            {/* REVIEWS */}
            <Link
              to="/reviews"
              className="workflow-card"
            >
              <span>
                05
              </span>

              <h3>
                Reviews
              </h3>

              <p>
                Share your experience with your designer.
              </p>

              <strong>
                Leave Review →
              </strong>
            </Link>

          </div>

        </div>

        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">

          <p className="section-label">
            QUICK ACTIONS
          </p>

          <Link to="/designers">
            Find a Designer →
          </Link>

          <Link to="/create-project">
            Start New Project →
          </Link>

          <Link to="/consultation">
            Request Consultation →
          </Link>

          <Link to="/quotation">
            Review Quotation →
          </Link>

          <Link to="/design-review">
            Review Design →
          </Link>

          <Link to="/milestones">
            Project Milestones →
          </Link>

          <Link to="/payments">
            Payment & Invoice →
          </Link>

          <Link to="/reviews">
            Leave a Review →
          </Link>

        </aside>

      </section>

    </main>
  );
}

export default CustomerDashboard;