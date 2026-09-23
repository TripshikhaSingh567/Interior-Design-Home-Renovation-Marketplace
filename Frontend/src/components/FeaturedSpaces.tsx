function FeaturedSpaces() {
  const spaces = [
    {
      title: "Warm & Minimal",
      category: "Living Room",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Modern Comfort",
      category: "Bedroom",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Timeless Elegance",
      category: "Dining",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    },
  ]

  return (
    <section className="featured-spaces">
      <div className="featured-header">
        <div>
          <p className="section-label">OUR FAVORITES</p>
          <h2>Spaces that inspire.</h2>
        </div>

        <p className="featured-description">
          Explore thoughtfully designed spaces created by talented interior
          designers.
        </p>
      </div>

      <div className="spaces-grid">
        {spaces.map((space) => (
          <article className="space-card" key={space.title}>
            <div className="space-image-wrapper">
              <img src={space.image} alt={space.title} />
            </div>

            <div className="space-info">
              <div>
                <h3>{space.title}</h3>
                <p>{space.category}</p>
              </div>

              <span>→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedSpaces