import { Link } from "react-router-dom";

const milestones = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "Project requirements and design preferences discussed.",
    key: "consultation",
  },
  {
    number: "02",
    title: "Design Concept",
    description: "Initial design concepts and moodboards prepared.",
    key: "quotation",
  },
  {
    number: "03",
    title: "Design Review",
    description: "Review the latest design and request changes if needed.",
    key: "design",
  },
  {
    number: "04",
    title: "Final Design",
    description: "Final design approved and prepared for execution.",
    key: "final",
  },
  {
    number: "05",
    title: "Project Completion",
    description: "Final project delivery and completion.",
    key: "completion",
  },
];

function Milestones() {
  /* --------------------------------
     PROJECT DATA
  -------------------------------- */

  const savedProject = localStorage.getItem("projectCreated");

  let project = null;

  if (savedProject) {
    try {
      project = JSON.parse(savedProject);
    } catch {
      project = null;
    }
  }

  /* --------------------------------
     CONSULTATION DATA
  -------------------------------- */

  const savedConsultation = localStorage.getItem(
    "consultationRequest"
  );

  let consultation = null;

  if (savedConsultation) {
    try {
      consultation = JSON.parse(savedConsultation);
    } catch {
      consultation = null;
    }
  }

  /* --------------------------------
     QUOTATION DATA
  -------------------------------- */

  const savedQuotation = localStorage.getItem(
    "quotationStatus"
  );

  let quotationStatus = "";

  if (savedQuotation) {
    try {
      const quotation = JSON.parse(savedQuotation);

      quotationStatus =
        quotation?.status || "";
    } catch {
      quotationStatus = "";
    }
  }

  /* --------------------------------
     DESIGN REVIEW DATA
  -------------------------------- */

  const savedDesignReview = localStorage.getItem(
    "designReviewStatus"
  );

  let designReviewStatus = "";

  if (savedDesignReview) {
    try {
      const designReview =
        JSON.parse(savedDesignReview);

      designReviewStatus =
        designReview?.status || designReview || "";
    } catch {
      designReviewStatus = savedDesignReview;
    }
  }

  /* --------------------------------
     DISPLAY DATA
  -------------------------------- */

  const projectName =
    project?.name || "My Interior Project";

  const designerName =
    consultation?.designer ||
    "Designer not assigned";

  /* --------------------------------
     WORKFLOW STATUS
  -------------------------------- */

  const consultationDone =
    Boolean(consultation);

  const quotationDone =
    quotationStatus === "ACCEPTED";

  const designDone =
    designReviewStatus === "APPROVED";

  /* --------------------------------
     PROGRESS
  -------------------------------- */

  const completedCount = [
    consultationDone,
    quotationDone,
    designDone,
  ].filter(Boolean).length;

  let progress = 0;

  if (completedCount === 1) {
    progress = 20;
  }

  if (completedCount === 2) {
    progress = 40;
  }

  if (completedCount === 3) {
    progress = 60;
  }

  /* --------------------------------
     MILESTONE STATUS
  -------------------------------- */

  const getStatus = (key: string) => {
    if (key === "consultation") {
      return consultationDone
        ? "COMPLETED"
        : "UPCOMING";
    }

    if (key === "quotation") {
      if (quotationDone) {
        return "COMPLETED";
      }

      if (consultationDone) {
        return "IN PROGRESS";
      }

      return "UPCOMING";
    }

    if (key === "design") {
      if (designDone) {
        return "COMPLETED";
      }

      if (quotationDone) {
        return "IN PROGRESS";
      }

      return "UPCOMING";
    }

    if (key === "final") {
      return designDone
        ? "IN PROGRESS"
        : "UPCOMING";
    }

    if (key === "completion") {
      return "UPCOMING";
    }

    return "UPCOMING";
  };

  return (
    <main className="milestones-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="milestones-hero">

        <p className="section-label">
          PROJECT PROGRESS
        </p>

        <h1>
          Track your
          <br />
          project journey.
        </h1>

        <p>
          Follow every stage of your interior design project
          <br />
          from consultation to completion.
        </p>

      </section>

      {/* =========================
          PROJECT SECTION
      ========================== */}

      <section className="milestones-section">

        {/* PROJECT HEADER */}

        <div className="milestones-project-header">

          <div>

            <p className="section-label">
              CURRENT PROJECT
            </p>

            <h2>
              {projectName}
            </h2>

            <p>
              Designer: {designerName}
            </p>

          </div>

          {/* OVERALL PROGRESS */}

          <div className="overall-progress">

            <span>
              {progress}%
            </span>

            <div className="progress-track">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <small>
              Overall progress
            </small>

          </div>

        </div>

        {/* =========================
            MILESTONES
        ========================== */}

        <div className="milestones-list">

          {milestones.map((milestone) => {

            const status =
              getStatus(milestone.key);

            return (
              <div
                className="milestone-item"
                key={milestone.number}
              >

                {/* NUMBER */}

                <div className="milestone-number">
                  {milestone.number}
                </div>

                {/* CONTENT */}

                <div className="milestone-content">

                  <div className="milestone-title-row">

                    <h3>
                      {milestone.title}
                    </h3>

                    <span
                      className={`milestone-status ${status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {status}
                    </span>

                  </div>

                  <p>
                    {milestone.description}
                  </p>

                </div>

              </div>
            );

          })}

        </div>

        {/* =========================
            ACTIONS
        ========================== */}

        <div className="milestones-actions">

          <Link
            to="/design-review"
            className="primary-btn"
          >
            Review Design →
          </Link>

          <Link
            to="/dashboard"
            className="back-link"
          >
            ← Back to Dashboard
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Milestones;