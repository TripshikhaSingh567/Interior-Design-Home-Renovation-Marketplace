import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-content">

        <p className="section-label">404 — PAGE NOT FOUND</p>

        <h1>
          This space
          <br />
          doesn't exist.
        </h1>

        <p>
          The page you're looking for may have been moved,
          <br />
          deleted, or doesn't exist.
        </p>

        <Link
          to="/"
          className="primary-btn"
        >
          Back to Home →
        </Link>

      </section>
    </main>
  );
}

export default NotFound;