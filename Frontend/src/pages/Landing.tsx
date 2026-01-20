import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // ✅ ADD
import "../styles/Landing.css";


const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ ADD

  // 🔁 Redirect logged-in users to opportunities
  useEffect(() => {
    if (user) {
      navigate("/opportunities", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register"); // ⚠️ you use /register, not /signup
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Find the Right Opportunities. Faster.</h1>
        <p>
          Discover internships,jobs,scholarships and hackathons curated for students and
          early professionals.
        </p>

        <div className="hero-actions">
          <button onClick={handleSignup}>Get Started</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </section>
       <section className="features-section">
    <div className="features-grid">
      <div className="feature-card">
        <div className="feature-icon">🔍</div>
        <h3>Smart Search</h3>
        <p>
          Quickly find internships, jobs, and hackathons using powerful search
          and category filters.
        </p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">🔖</div>
        <h3>Track & Bookmark</h3>
        <p>
          Bookmark opportunities and track your applications in one organized
          place.
        </p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">🛡️</div>
        <h3>Verified Opportunities</h3>
        <p>
          Opportunities are posted and managed by admins to ensure quality and
          authenticity.
        </p>
      </div>
    </div>
  </section>
  {/* CTA Section */}
<section className="cta-section">
  <h2>Start Building Your Career Today</h2>
  <p>
    Join thousands of students discovering internships, jobs, and hackathons
    tailored for them.
  </p>

  <div className="cta-actions">
    <button onClick={handleSignup}>Create Free Account</button>
    <button onClick={handleLogin}>Login</button>
  </div>
</section>
   {/* Footer */}
<footer className="footer">
  © {new Date().getFullYear()} <span>Career Opportunities Platform</span>.  
  All rights reserved.
</footer>

    </div>
  );
};

export default Landing;
