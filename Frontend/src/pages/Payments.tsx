import { useState } from "react";
import { Link } from "react-router-dom";

function Payments() {
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

  let quotation = null;

  if (savedQuotation) {
    try {
      quotation = JSON.parse(savedQuotation);
    } catch {
      quotation = null;
    }
  }

  /* --------------------------------
     PAYMENT DATA
  -------------------------------- */

  const savedPayment = localStorage.getItem(
    "paymentStatus"
  );

  let initialPaymentStatus = "PENDING";

  if (savedPayment) {
    try {
      const payment = JSON.parse(savedPayment);

      initialPaymentStatus =
        payment?.status || "PENDING";
    } catch {
      initialPaymentStatus = "PENDING";
    }
  }

  const [paymentStatus, setPaymentStatus] =
    useState(initialPaymentStatus);

  /* --------------------------------
     DISPLAY DATA
  -------------------------------- */

  const projectName =
    project?.name || "My Interior Project";

  const designerName =
    consultation?.designer ||
    quotation?.designer ||
    "Designer not assigned";

  const totalAmount =
    quotation?.amount || 85000;

  /* --------------------------------
     PAYMENT BREAKDOWN
  -------------------------------- */

  const breakdown = [
    {
      name: "Design consultation",
      amount: 10000,
    },
    {
      name: "Space planning & design",
      amount: 30000,
    },
    {
      name: "3D visualisation",
      amount: 20000,
    },
    {
      name: "Material & styling guidance",
      amount: 25000,
    },
  ];

  /* --------------------------------
     PAYMENT HANDLER
  -------------------------------- */

  const handlePayment = () => {
    const paymentData = {
      status: "PAID",
      amount: totalAmount,
      project: projectName,
      designer: designerName,
      date: new Date().toLocaleDateString(),
    };

    setPaymentStatus("PAID");

    localStorage.setItem(
      "paymentStatus",
      JSON.stringify(paymentData)
    );
  };

  /* --------------------------------
     INVOICE NUMBER
  -------------------------------- */

  const invoiceNumber =
    "HV-2026-001";

  return (
    <main className="payments-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="payments-hero">

        <p className="section-label">
          PAYMENTS
        </p>

        <h1>
          Manage your
          <br />
          project payments.
        </h1>

        <p>
          Review your project amount, payment status
          <br />
          and invoice details in one place.
        </p>

      </section>

      {/* =========================
          PAYMENT SECTION
      ========================== */}

      <section className="payments-section">

        {/* PROJECT HEADER */}

        <div className="payment-project-header">

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

          <span className="payment-status">
            {paymentStatus}
          </span>

        </div>

        {/* =========================
            PAYMENT CARD
        ========================== */}

        <div className="payment-card">

          <div className="payment-card-top">

            <div>

              <p className="section-label">
                PROJECT TOTAL
              </p>

              <h3>
                ₹{totalAmount.toLocaleString("en-IN")}
              </h3>

              <p>
                Interior design project estimate
              </p>

            </div>

            <div className="payment-icon">
              ₹
            </div>

          </div>

          {/* BREAKDOWN */}

          <div className="payment-breakdown">

            {breakdown.map((item) => (
              <div key={item.name}>

                <span>
                  {item.name}
                </span>

                <strong>
                  ₹{item.amount.toLocaleString("en-IN")}
                </strong>

              </div>
            ))}

            <div className="payment-total">

              <span>
                Total
              </span>

              <strong>
                ₹{totalAmount.toLocaleString("en-IN")}
              </strong>

            </div>

          </div>

          {/* PAYMENT ACTION */}

          {paymentStatus === "PENDING" ? (

            <div className="payment-action">

              <div>

                <p>
                  Payment due
                </p>

                <strong>
                  ₹{totalAmount.toLocaleString("en-IN")}
                </strong>

              </div>

              <button
                type="button"
                className="primary-btn"
                onClick={handlePayment}
              >
                Pay Now →
              </button>

            </div>

          ) : (

            <div className="payment-success">

              <div>
                <span>✓</span>
              </div>

              <div>

                <h3>
                  Payment completed
                </h3>

                <p>
                  Your project payment has been successfully recorded.
                </p>

              </div>

            </div>

          )}

        </div>

        {/* =========================
            INVOICE
        ========================== */}

        <div className="invoice-card">

          <div>

            <p className="section-label">
              INVOICE
            </p>

            <h2>
              Project Invoice
            </h2>

            <p>
              Invoice #{invoiceNumber}
            </p>

          </div>

          <div className="invoice-details">

            <div>

              <span>
                Project
              </span>

              <strong>
                {projectName}
              </strong>

            </div>

            <div>

              <span>
                Designer
              </span>

              <strong>
                {designerName}
              </strong>

            </div>

            <div>

              <span>
                Amount
              </span>

              <strong>
                ₹{totalAmount.toLocaleString("en-IN")}
              </strong>

            </div>

            <div>

              <span>
                Status
              </span>

              <strong>
                {paymentStatus}
              </strong>

            </div>

          </div>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              window.print();
            }}
          >
            Download Invoice ↓
          </button>

        </div>

        {/* =========================
            NAVIGATION
        ========================== */}

        <div className="payments-footer">

          <Link
            to="/milestones"
            className="back-link"
          >
            ← View Project Milestones
          </Link>

          <Link
            to="/dashboard"
            className="back-link"
          >
            Back to Dashboard →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Payments;