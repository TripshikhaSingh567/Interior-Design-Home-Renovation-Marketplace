import { useState } from "react";
import { Link } from "react-router-dom";

function Reviews() {
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
     EXISTING REVIEW
  -------------------------------- */

  const savedReview = localStorage.getItem(
    "projectReview"
  );

  let existingReview = null;

  if (savedReview) {
    try {
      existingReview = JSON.parse(savedReview);
    } catch {
      existingReview = null;
    }
  }

  /* --------------------------------
     STATE
  -------------------------------- */

  const [rating, setRating] = useState(
    existingReview?.rating || 0
  );

  const [review, setReview] = useState(
    existingReview?.review || ""
  );

  const [submitted, setSubmitted] = useState(
    Boolean(existingReview)
  );

  const [error, setError] = useState("");

  /* --------------------------------
     DISPLAY DATA
  -------------------------------- */

  const projectName =
    project?.name || "My Interior Project";

  const designerName =
    consultation?.designer ||
    existingReview?.designer ||
    "Designer not assigned";

  /* --------------------------------
     SUBMIT REVIEW
  -------------------------------- */

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (rating === 0) {
      setError(
        "Please select a rating before submitting."
      );
      return;
    }

    if (!review.trim()) {
      setError(
        "Please write a review before submitting."
      );
      return;
    }

    if (review.trim().length < 10) {
      setError(
        "Please write at least 10 characters in your review."
      );
      return;
    }

    const reviewData = {
      rating,
      review: review.trim(),
      designer: designerName,
      project: projectName,
      date: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "projectReview",
      JSON.stringify(reviewData)
    );

    setReview(review.trim());
    setSubmitted(true);
  };

  /* --------------------------------
     EDIT REVIEW
  -------------------------------- */

  const handleEditReview = () => {
    setSubmitted(false);
    setError("");
  };

  return (
    <main className="reviews-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="reviews-hero">

        <p className="section-label">
          YOUR FEEDBACK
        </p>

        <h1>
          Share your
          <br />
          design experience.
        </h1>

        <p>
          Tell us about your experience working with your designer
          <br />
          and help us improve the design journey.
        </p>

      </section>

      {/* =========================
          REVIEW SECTION
      ========================== */}

      <section className="reviews-section">

        {/* PROJECT HEADER */}

        <div className="review-project-header">

          <div>

            <p className="section-label">
              COMPLETED PROJECT
            </p>

            <h2>
              {projectName}
            </h2>

            <p>
              Designer: {designerName}
            </p>

          </div>

          <span className="review-status">
            PROJECT COMPLETED
          </span>

        </div>

        {/* =========================
            REVIEW FORM
        ========================== */}

        {!submitted ? (

          <form
            className="review-form"
            onSubmit={handleSubmit}
          >

            {/* RATING */}

            <div className="review-rating-section">

              <p className="section-label">
                RATE YOUR EXPERIENCE
              </p>

              <h3>
                How was your experience?
              </h3>

              <div className="rating-stars">

                {[1, 2, 3, 4, 5].map(
                  (star) => (

                    <button
                      key={star}
                      type="button"
                      className={
                        star <= rating
                          ? "star active"
                          : "star"
                      }
                      onClick={() =>
                        setRating(star)
                      }
                      aria-label={`Rate ${star} stars`}
                      aria-pressed={
                        star === rating
                      }
                    >
                      ★
                    </button>

                  )
                )}

              </div>

              <p className="rating-text">

                {rating === 0
                  ? "Select a rating"
                  : `${rating} out of 5 stars`}

              </p>

            </div>

            {/* REVIEW */}

            <div className="review-field">

              <label htmlFor="review">
                YOUR REVIEW
              </label>

              <textarea
                id="review"
                rows={7}
                placeholder="Tell us about your experience with the designer..."
                value={review}
                onChange={(e) =>
                  setReview(e.target.value)
                }
                maxLength={1000}
              />

              <small>
                {review.length}/1000 characters
              </small>

            </div>

            {/* ERROR */}

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="primary-btn"
            >
              Submit Review →
            </button>

          </form>

        ) : (

          /* =========================
             SUCCESS
          ========================== */

          <div className="review-success">

            <div className="review-success-icon">
              ✓
            </div>

            <div>

              <p className="section-label">
                THANK YOU
              </p>

              <h2>
                Review submitted successfully.
              </h2>

              <p>
                Your feedback has been saved and will be
                shared with your designer.
              </p>

              <div className="submitted-review">

                <div className="submitted-rating">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <span
                        key={star}
                        className={
                          star <= rating
                            ? "submitted-star active"
                            : "submitted-star"
                        }
                      >
                        ★
                      </span>
                    )
                  )}

                </div>

                <p>
                  “{review}”
                </p>

              </div>

              <button
                type="button"
                className="secondary-btn"
                onClick={handleEditReview}
              >
                Edit Review
              </button>

            </div>

          </div>

        )}

        {/* =========================
            FOOTER
        ========================== */}

        <div className="reviews-footer">

          <Link
            to="/payments"
            className="back-link"
          >
            ← Back to Payments
          </Link>

          <Link
            to="/dashboard"
            className="back-link"
          >
            Go to Dashboard →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Reviews;