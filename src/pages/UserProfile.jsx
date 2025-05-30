// User Profile page
// Lets users edit their account details like name, address, and password.

import { useState } from "react";
import axios from "axios";
import md5 from "blueimp-md5";
import { useNavigate } from "react-router-dom";
import "./userProfile.css";
import { useUser } from "../context/UserContext";

const UserProfile = () => {
  const { user, setUser, logout } = useUser();
  const [formData, setFormData] = useState({
    ...user,
    confirmPassword: user.password,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password && formData.password !== formData.confirmPassword) {
        setMessage("Passwords don't match");
        return;
      }

      const updatedUser = {
        ...formData,
        password: formData.password ? md5(formData.password) : user.password
      };
      delete updatedUser.confirmPassword; 
      setUser(updatedUser);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        alert("Account deleted successfully");
        logout();
        navigate("/");
      } catch (error) {
        setMessage("Error deleting account");
        console.error(error);
      }
    }
  };

  return (
    <section className="edit-profile">
      <div className="profile-contain">
        <h2>Edit Profile</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            pattern="09[0-9]{8}"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            minLength={4}
          />
          
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            minLength={4}
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-btn">
            Save Changes
          </button>
        </form>

        <button onClick={handleDelete} className="secondary-btn">
          Delete Account
        </button>
      </div>
    </section>
  );
};

export default UserProfile;