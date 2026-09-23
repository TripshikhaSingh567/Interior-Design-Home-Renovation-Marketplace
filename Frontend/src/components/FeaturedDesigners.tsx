import DesignerCard from "./DesignerCard";

function FeaturedDesigners() {
  const designers = [
    {
      name: "Studio Aria",
      location: "Hyderabad",
      rating: "4.9",
      experience: "8+ years",
      style: "Modern · Minimal",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "The Living Room",
      location: "Bengaluru",
      rating: "4.8",
      experience: "6+ years",
      style: "Contemporary · Luxury",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Atelier Nine",
      location: "Mumbai",
      rating: "4.9",
      experience: "10+ years",
      style: "Elegant · Timeless",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="featured-designers">
      <div className="designers-header">
        <div>
          <p className="section-label">MEET THE DESIGNERS</p>
          <h2>People who<br />make spaces.</h2>
        </div>

        <p className="designers-description">
          Discover verified interior designers with different styles,
          experience, and creative perspectives.
        </p>
      </div>

      <div className="designers-grid">
        {designers.map((designer) => (
          <DesignerCard
            key={designer.name}
            name={designer.name}
            location={designer.location}
            rating={designer.rating}
            experience={designer.experience}
            style={designer.style}
            image={designer.image}
          />
        ))}
      </div>

      <div className="designers-cta">
        <a href="/designers">View all designers →</a>
      </div>
    </section>
  );
}

export default FeaturedDesigners;