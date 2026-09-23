import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Quotation() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(() => {
    const savedQuotation = localStorage.getItem("quotationStatus");

    if (!savedQuotation) {
      return "PENDING";
    }

    try {
      const quotation = JSON.parse(savedQuotation);
      return quotation.status || "PENDING";
    } catch {
      return "PENDING";
    }
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

  const handleAction = (action: string) => {
    setStatus(action);

    localStorage.setItem(
      "quotationStatus",
      JSON.stringify({
        status: action,
        designer: designerName,
        amount: 85000,
      })
    );

    if (action === "ACCEPTED") {
      setMessage("Quotation accepted successfully.");
    }

    if (action === "REVISION REQUESTED") {
      setMessage("Revision request sent to the designer.");
    }

    if (action === "REJECTED") {
      setMessage("Quotation rejected.");
    }
  };

  return (
    <main className="quotation-page">

      {/* HEADER */}
      <section className="quotation-hero">
        <p className="section-label">QUOTATION</p>

        <h1>
          Review your
          <br />
          design proposal.
        </h1>

        <p>
          Review the quotation from your designer and
          <br />
          choose how you'd like to proceed.
        </p>
      </section>

      {/* QUOTATION CARD */}
      <section className="quotation-section">

        <div className="quotation-card">

          <div className="quotation-card-header">

            <div>
              <p className="section-label">
                FROM YOUR DESIGNER
              </p>

              <h2>{designerName}</h2>

              <p>
                Interior Design · Your Project
              </p>
            </div>

            <span className="quotation-status">
              {status}
            </span>

          </div>

          {/* PRICE */}
          <div className="quotation-price">

            <p>Total Project Estimate</p>

            <h3>₹85,000</h3>

            <span>
              Estimated project cost
            </span>

          </div>

          {/* BREAKDOWN */}
          <div className="quotation-breakdown">

            <div>
              <span>Design consultation</span>
              <strong>₹10,000</strong>
            </div>

            <div>
              <span>Space planning & design</span>
              <strong>₹30,000</strong>
            </div>

            <div>
              <span>3D visualisation</span>
              <strong>₹20,000</strong>
            </div>

            <div>
              <span>Material & styling guidance</span>
              <strong>₹25,000</strong>
            </div>

          </div>

          {/* ACTIONS */}
          {status === "PENDING" && (
            <div className="quotation-actions">

              <button
                className="primary-btn"
                onClick={() => handleAction("ACCEPTED")}
              >
                Accept Quotation →
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  handleAction("REVISION REQUESTED")
                }
              >
                Request Revision
              </button>

              <button
                className="text-btn"
                onClick={() =>
                  handleAction("REJECTED")
                }
              >
                Reject Quotation
              </button>

            </div>
          )}

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

        </div>

        {/* BACK */}
        <div className="quotation-footer">

          <Link
            to="/dashboard"
            className="back-link"
          >
            ← Back to Dashboard
          </Link>

          {status === "ACCEPTED" && (
            <button
              className="primary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Continue to Project →
            </button>
          )}

        </div>

      </section>

    </main>
  );
}

export default Quotation;