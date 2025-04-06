import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Auction Platform</h1>

      <div className="button-container">
        <button onClick={() => navigate("/home")} className="nav-btn">Home</button>
        <button onClick={() => navigate("/services")} className="nav-btn">Services</button>
        <button onClick={() => navigate("/about")} className="nav-btn">About</button>
        <button onClick={() => navigate("/post-auction")} className="nav-btn">Post Auction</button>
      </div>

      <div className="contact-footer">
        <p>Contact us at: ey@email.com</p>
      </div>
    </div>
  );
};

export default Homepage;
