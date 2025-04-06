import React, { useState } from "react";
import "./style.css";

const PostAuction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    duration: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to post an auction.");
      return;
    }
  
    const payload = {
      itemName: formData.title,
      description: formData.description,
      originalPrice: Number(formData.startingBid),
      closingTime: formData.duration, 
    };
  
    try {
      const response = await fetch("http://localhost:5001/post-auction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Auction posted successfully!");
        setFormData({
          title: "",
          description: "",
          startingBid: "",
          duration: "",
          image: null,
        });
      } else {
        alert(result.message || "Failed to post auction.");
      }
    } catch (err) {
      console.error("Error posting auction:", err);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <div className="post-auction-wrapper">
      <form className="post-auction-form" onSubmit={handleSubmit}>
        <h2>Post Your Auction</h2>

        <label><strong>Item Name:</strong></label>
        <input
          type="text"
          name="title"
          placeholder="Enter item title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label><strong>Description:</strong></label>
        <textarea
          name="description"
          placeholder="Enter item description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label><strong>Starting Bid:</strong></label>
        <input
          type="number"
          name="startingBid"
          placeholder="Enter starting bid"
          value={formData.startingBid}
          onChange={handleChange}
          required
        />

        <label><strong>End Date:</strong></label>
        <input
          type="datetime-local"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <button type="submit" className="nav-btn">Post Auction</button>
      </form>
    </div>
  );
};

export default PostAuction;
