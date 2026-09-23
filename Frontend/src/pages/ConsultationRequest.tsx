import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function ConsultationRequest() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const designerName =
    searchParams.get("designer") || "Selected Designer";

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem(
      "consultationRequest",
      JSON.stringify({
        designer: designerName,
        status: "REQUESTED",
        date: new Date().toLocaleDateString(),
      })
    );

    setSubmitted(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  return (
    <main className="consultation-page">

      <section className="consultation-hero">
        <p className="section-label">CONSULTATION REQUEST</p>

        <h1>
          Let's talk about
          <br />
          your space.
        </h1>

        <p>
          Tell us a little about what you need and
          <br />
          we'll help you get started with your designer.
        </p>
      </section>

      <section className="consultation-form-section">

        <div className="selected-designer">
          <p className="section-label">YOUR DESIGNER</p>

          <h2>{designerName}</h2>

          <p>
            You are requesting a consultation with this designer.
          </p>
        </div>

        <form
          className="consultation-form"
          onSubmit={handleSubmit}
        >

          <div className="form-field">
            <label>Preferred Date</label>

            <input
              type="date"
              required
            />
          </div>

          <div className="form-field">
            <label>Preferred Time</label>

            <select required>
              <option value="">
                Select a time
              </option>
              <option>10:00 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>4:00 PM</option>
              <option>6:00 PM</option>
            </select>
          </div>

          <div className="form-field">
            <label>What would you like to discuss?</label>

            <textarea
              rows={6}
              placeholder="Tell the designer about your space, requirements and ideas..."
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Request Consultation →
          </button>

          {submitted && (
            <p className="success-message">
              Consultation requested successfully.
            </p>
          )}

        </form>

        <Link
          to="/designers"
          className="back-link"
        >
          ← Back to designers
        </Link>

      </section>

    </main>
  );
}

export default ConsultationRequest;