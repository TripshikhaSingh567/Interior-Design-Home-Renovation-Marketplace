function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Havenly</h2>
          <p>
            Beautiful spaces, thoughtful design,
            <br />
            and the right designer for your home.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="/designers">Find Designers</a>
            <a href="/inspiration">Inspiration</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="/how-it-works">How It Works</a>
            <a href="/about">About</a>
            <a href="/login">Log in</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Havenly. All rights reserved.</p>
        <p>Interior Design Marketplace</p>
      </div>
    </footer>
  )
}

export default Footer