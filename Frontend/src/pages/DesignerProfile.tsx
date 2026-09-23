import { Link, useSearchParams } from "react-router-dom";

const designers = [
  {
    id: "1",
    name: "Aarav Sharma",
    location: "Mumbai",
    style: "Modern",
    rating: 4.9,
    projects: 42,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    about:
      "Aarav creates refined modern interiors with a focus on clean forms, natural materials and comfortable living spaces.",
  },
  {
    id: "2",
    name: "Meera Kapoor",
    location: "Bangalore",
    style: "Minimal",
    rating: 4.8,
    projects: 36,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    about:
      "Meera specialises in calm, minimal interiors that balance functionality with warm and timeless details.",
  },
  {
    id: "3",
    name: "Rohan Malhotra",
    location: "Delhi",
    style: "Contemporary",
    rating: 4.9,
    projects: 51,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    about:
      "Rohan designs contemporary spaces with bold architectural details, thoughtful layouts and modern finishes.",
  },
  {
    id: "4",
    name: "Ananya Rao",
    location: "Hyderabad",
    style: "Luxury",
    rating: 4.7,
    projects: 29,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    about:
      "Ananya focuses on sophisticated luxury interiors with elegant materials, rich textures and personalised details.",
  },
  {
    id: "5",
    name: "Kabir Mehta",
    location: "Chennai",
    style: "Traditional",
    rating: 4.8,
    projects: 33,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    about:
      "Kabir combines traditional design elements with modern functionality to create warm and character-filled homes.",
  },
  {
    id: "6",
    name: "Ishita Verma",
    location: "Pune",
    style: "Modern",
    rating: 4.9,
    projects: 47,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80",
    about:
      "Ishita creates modern, practical interiors that are personalised around each client's lifestyle and needs.",
  },
];

function DesignerProfile() {
  const [searchParams] = useSearchParams();

  const designerId = searchParams.get("id");

  const designer =
    designers.find((item) => item.id === designerId) || designers[0];

  return (
    <main className="designer-profile-page">

      {/* HERO */}
      <section className="designer-profile-hero">

        <div className="designer-profile-image">
          <img
            src={designer.image}
            alt={designer.name}
          />
        </div>

        <div className="designer-profile-info">

          <p className="section-label">
            INTERIOR DESIGNER
          </p>

          <h1>{designer.name}</h1>

          <p className="designer-profile-location">
            {designer.location} · {designer.style}
          </p>

          <div className="designer-profile-meta">
            <span>
              ★ {designer.rating}
            </span>

            <span>
              {designer.projects} projects
            </span>
          </div>

          <p className="designer-profile-about">
            {designer.about}
          </p>

          <Link
            to={`/consultation?designer=${encodeURIComponent(
              designer.name
            )}`}
            className="primary-btn"
          >
            Work With This Designer →
          </Link>

        </div>

      </section>

      {/* PORTFOLIO */}
      <section className="designer-portfolio">

        <div className="section-heading">

          <div>
            <p className="section-label">
              PORTFOLIO
            </p>

            <h2>
              Selected work
            </h2>
          </div>

        </div>

        <div className="portfolio-grid">

          <div className="portfolio-item">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
              alt="Interior project"
            />
          </div>

          <div className="portfolio-item">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
              alt="Interior project"
            />
          </div>

          <div className="portfolio-item">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
              alt="Interior project"
            />
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="designer-profile-cta">

        <p className="section-label">
          READY TO GET STARTED?
        </p>

        <h2>
          Create a space
          <br />
          you'll love coming home to.
        </h2>

        <Link
          to={`/consultation?designer=${encodeURIComponent(
            designer.name
          )}`}
          className="primary-btn"
        >
          Start Your Project →
        </Link>

      </section>

    </main>
  );
}

export default DesignerProfile;