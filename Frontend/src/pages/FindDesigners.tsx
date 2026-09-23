import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Designer = {
  id: number;
  name: string;
  location: string;
  style: string;
  rating: number;
  projects: number;
  image: string;
};

const designers: Designer[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    location: "Mumbai",
    style: "Modern",
    rating: 4.9,
    projects: 42,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Meera Kapoor",
    location: "Bangalore",
    style: "Minimal",
    rating: 4.8,
    projects: 36,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Rohan Malhotra",
    location: "Delhi",
    style: "Contemporary",
    rating: 4.9,
    projects: 51,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Ananya Rao",
    location: "Hyderabad",
    style: "Luxury",
    rating: 4.7,
    projects: 29,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Kabir Mehta",
    location: "Chennai",
    style: "Traditional",
    rating: 4.8,
    projects: 33,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Ishita Verma",
    location: "Pune",
    style: "Modern",
    rating: 4.9,
    projects: 47,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
];

function FindDesigners() {
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState("All Styles");
  const [location, setLocation] = useState("All Locations");

  const filteredDesigners = useMemo(() => {
    return designers.filter((designer) => {
      const matchesSearch =
        designer.name.toLowerCase().includes(search.toLowerCase()) ||
        designer.style.toLowerCase().includes(search.toLowerCase()) ||
        designer.location.toLowerCase().includes(search.toLowerCase());

      const matchesStyle =
        style === "All Styles" || designer.style === style;

      const matchesLocation =
        location === "All Locations" ||
        designer.location === location;

      return matchesSearch && matchesStyle && matchesLocation;
    });
  }, [search, style, location]);

  return (
    <main className="find-designers-page">

      {/* HERO */}
      <section className="find-designers-hero">
        <p className="section-label">FIND YOUR DESIGNER</p>

        <h1>
          Meet designers
          <br />
          who understand your style.
        </h1>

        <p>
          Explore our curated community of interior designers
          <br />
          and find the right creative partner for your space.
        </p>
      </section>

      {/* FILTERS */}
      <section className="designer-filters">

        <div className="designer-search">
          <input
            type="text"
            placeholder="Search designers, styles or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option>All Styles</option>
            <option>Modern</option>
            <option>Minimal</option>
            <option>Contemporary</option>
            <option>Luxury</option>
            <option>Traditional</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>All Locations</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Delhi</option>
            <option>Hyderabad</option>
            <option>Chennai</option>
            <option>Pune</option>
          </select>

        </div>
      </section>

      {/* DESIGNERS */}
      <section className="designers-section">

        <div className="designers-section-header">
          <div>
            <p className="section-label">OUR DESIGNERS</p>

            <h2>
              {filteredDesigners.length} designers
            </h2>
          </div>
        </div>

        {filteredDesigners.length > 0 ? (
          <div className="designers-grid">

            {filteredDesigners.map((designer) => (
              <article
                className="designer-card"
                key={designer.id}
              >

                <div className="designer-image-wrapper">
                  <img
                    src={designer.image}
                    alt={designer.name}
                    className="designer-image"
                  />
                </div>

                <div className="designer-card-content">

                  <div className="designer-card-top">

                    <div>
                      <h3>{designer.name}</h3>

                      <p>
                        {designer.location} · {designer.style}
                      </p>
                    </div>

                    <span className="designer-rating">
                      ★ {designer.rating}
                    </span>

                  </div>

                  <div className="designer-card-bottom">

                    <span>
                      {designer.projects} projects
                    </span>

                    <Link
                      to={`/designer-profile?id=${designer.id}`}
                      className="designer-profile-link"
                    >
                      View Profile →
                    </Link>

                  </div>

                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="designer-empty-state">
            <h3>No designers found</h3>

            <p>
              Try changing your search or filters.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setStyle("All Styles");
                setLocation("All Locations");
              }}
              className="primary-btn"
            >
              Clear Filters
            </button>
          </div>
        )}

      </section>

    </main>
  );
}

export default FindDesigners;