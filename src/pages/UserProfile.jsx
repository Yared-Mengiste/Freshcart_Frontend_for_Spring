import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axiosInstance from "../api/axiosInstance";
import "./userProfile.css";

const UserProfile = () => {
  const { user, setUser, logout } = useUser();
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    city: "",
    subcity: "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        phone: user.phone || "",
        city: user.city || "",
        subcity: user.subcity || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/users/${user.id}`, profileData);
      setMessage("Profile updated successfully!");
      setUser({ ...user, ...profileData }); // update context
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    try {
      await axiosInstance.put(`/users/${user.id}/password`, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage("Password changed successfully.");
      setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (error) {
      console.error(error);
      setMessage("Failed to change password.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axiosInstance.delete(`/users/${user.id}`);
        logout();
        navigate("/");
      } catch (error) {
        console.error(error);
        setMessage("Failed to delete account.");
      }
    }
  };

  return (
    <section className="edit-profile">
      <div className="profile-contain">
        <h2>Edit Profile</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleProfileSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            required
          />

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            pattern="09[0-9]{8}"
            value={profileData.phone}
            onChange={handleInputChange}
            required
          />

          <label>
            City:
            <select
              name="city"
              value={profileData.city}
              onChange={handleInputChange}
              required
            >
              <option value="">Select City</option>
              <option value="Addis Ababa">Addis Ababa</option>
            </select>
          </label>

          <label>
            Subcity:
            <select
              name="subcity"
              value={profileData.subcity}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Subcity</option>
              <option value="Addis Ketema">Addis Ketema</option>
              <option value="Akaky Kaliti">Akaky Kaliti</option>
              <option value="Arada">Arada</option>
              <option value="Bole">Bole</option>
              <option value="Gullele">Gullele</option>
              <option value="Kirkos">Kirkos</option>
              <option value="Kolfe Keranio">Kolfe Keranio</option>
              <option value="Lideta">Lideta</option>
              <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
              <option value="Yeka">Yeka</option>
            </select>
          </label>

          <button type="submit" className="primary-btn">
            Save Changes
          </button>
        </form>

        <hr />

        <h3>Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            required
          />

          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
            minLength={6}
          />

          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
            required
            minLength={6}
          />

          <button type="submit" className="primary-btn">
            Change Password
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
