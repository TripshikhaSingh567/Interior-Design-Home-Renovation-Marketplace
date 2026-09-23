type DesignerCardProps = {
  name: string;
  location: string;
  rating: string;
  experience: string;
  style: string;
  image: string;
};

function DesignerCard({
  name,
  location,
  rating,
  experience,
  style,
  image,
}: DesignerCardProps) {
  return (
    <article className="designer-card">

      <div className="designer-image-wrapper">
        <img src={image} alt={`${name} interior design`} />
      </div>

      <div className="designer-card-info">
        <div>
          <h3>{name}</h3>
          <p>{location}</p>
        </div>

        <span className="designer-rating">
          ★ {rating}
        </span>
      </div>

      <div className="designer-meta">
        <span>{style}</span>
        <span>{experience}</span>
      </div>

      <a href="/designer-profile" className="view-profile">
        View Profile →
      </a>

    </article>
  );
}

export default DesignerCard;