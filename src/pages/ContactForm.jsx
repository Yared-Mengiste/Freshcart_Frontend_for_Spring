// Contact Us page
// Simple contact form where users can leave feedback, questions, or suggestions.

import { useState, useEffect } from "react";
import axios from "axios";
import showObserver from "../animation";
import "./home.css";
import "./contactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(()=>{
    showObserver()
  },[])

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setErrors("");
  }


 

  return (
    <div className="form-container hidden-sec">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors && <small className="error">{errors}</small>}
        </div>
        <button type="submit" className="primary-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
