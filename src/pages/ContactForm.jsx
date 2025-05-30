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

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  useEffect(() => {
    showObserver();
  }, []);

  const validate = () => {
    const { name, email, message } = formData;

    if (!name.trim()) return "Name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address.";
    if (message.trim().length < 10) return "Message must be at least 10 characters.";

    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatusMessage(error);
      setStatusType("error");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/api/contacts", formData);
      setStatusMessage("Message sent successfully!");
      setStatusType("success");

      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (err) {
      setStatusMessage("Failed to send message. Please try again.");
      setStatusType("error");
    }
  };

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
        </div>

        {statusMessage && (
          <small className={statusType === "error" ? "error" : "success"}>
            {statusMessage}
          </small>
        )}

        <button type="submit" className="primary-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
