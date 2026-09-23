import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DesignReview() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(() => {
    const savedStatus = localStorage.getItem("designReviewStatus");

    return savedStatus || "PENDING";
  });

  const [message, setMessage] = useState("");

  const savedConsultation = localStorage.getItem(
    "consultationRequest"
  );

  let designerName = "Designer";

  if (savedConsultation) {
    try {
      const consultation = JSON.parse(savedConsultation);
      designerName = consultation.designer || "Designer";
    } catch {
      designerName = "Designer";
    }
  }

  const handleApprove = () => {
    setStatus("APPROVED");

    localStorage.setItem(
      "designReviewStatus",
      "APPROVED"
    );

    setMessage(
      "Design approved successfully."
    );
  };

  const handleChangeRequest = () => {
    setStatus("CHANGE REQUESTED");

    localStorage.setItem(
      "designReviewStatus",
      "CHANGE REQUESTED"
    );

    setMessage(
      "Your change request has been sent to the designer."
    );
  };

  return (
    <main className="design-review-page">

      {/* HERO */}
      <section className="design-review-hero">

        <p className="section-label">
          DESIGN REVIEW
        </p>

        <h1>
          Review your
          <br />
          latest design.
        </h1>

        <p>
          Take a look at the latest design proposal
          <br />
          and share your feedback with your designer.
        </p>

      </section>

      {/* DESIGN REVIEW */}
      <section className="design-review-section">

        <div className="design-review-card">

          {/* HEADER */}
          <div className="design-review-header">

            <div>

              <p className="section-label">
                DESIGN PROPOSAL
              </p>

              <h2>
                Living Room Concept
              </h2>

              <p>
                Designer: {designerName}
              </p>

            </div>

            <span className="design-review-status">
              {status}
            </span>

          </div>

          {/* DESIGN IMAGE */}
          <div className="design-review-image">

            <div className="design-placeholder">

              <span>
                DESIGN PREVIEW
              </span>

              <p>
                Latest design concept
              </p>

            </div>

          </div>

          {/* DETAILS */}
          <div className="design-review-details">

            <div>
              <span>Version</span>
              <strong>Version 1.0</strong>
            </div>

            <div>
              <span>Design Style</span>
              <strong>Modern</strong>
            </div>

            <div>
              <span>Space</span>
              <strong>Living Room</strong>
            </div>

          </div>

          {/* FEEDBACK */}
          {status === "PENDING" && (
            <div className="design-review-actions">

              <button
                type="button"
                className="primary-btn"
                onClick={handleApprove}
              >
                Approve Design →
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={handleChangeRequest}
              >
                Request Changes
              </button>

            </div>
          )}

          {/* MESSAGE */}
          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="design-review-footer">

          <Link
            to="/dashboard"
            className="back-link"
          >
            ← Back to Dashboard
          </Link>

          {status === "APPROVED" && (
            <button
              type="button"
              className="primary-btn"
              onClick={() => navigate("/milestones")}
            >
              View Project Progress →
            </button>
          )}

        </div>

      </section>

    </main>
  );
}

export default DesignReview;