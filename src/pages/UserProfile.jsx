import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userProfile.css";
import { useUser } from "../context/UserContext";

const UserProfile = () => {
  const { user, setUser, logout } = useUser();
  const navigate = useNavigate();

const [showPasswordForm, setShowPasswordForm] = useState(false);
const [oldPasswordCheck, setOldPasswordCheck] = useState("");
const [profileData, setProfileData] = useState({
    name: user.name,
    phone: user.phoneNo,
    city: user.city,
    address: user.subcity,
  });
const [passwordData, setPasswordData] = useState({
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});
const [passwordMessage, setPasswordMessage] = useState("");


  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8081/api/users/${user.id}`, profileData);
      setUser({ ...user, ...profileData });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile.");
      console.error(error);
    }
  };

  const handlePasswordInput = (e) => {
  setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
};

const handlePasswordChange = async (e) => {
  e.preventDefault();
  const { oldPassword, newPassword, confirmNewPassword } = passwordData;

  if (newPassword !== confirmNewPassword) {
    setPasswordMessage("New passwords do not match.");
    return;
  }

  try {
    await axios.put(`http://localhost:8081/api/users/${user.id}/password`, {
      oldPassword,
      newPassword,
    });
    setPasswordMessage("Password changed successfully.");
    setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  } catch (err) {
    console.error(err);
    setPasswordMessage("Error changing password. Check old password.");
  }
};



  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`http://localhost:8081/api/users/${user.id}`);
        logout();
        navigate("/");
        alert("Account deleted successfully");
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

        <form onSubmit={handleProfileSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            required
          />

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            pattern="09[0-9]{8}"
            value={profileData.phone}
            onChange={handleProfileChange}
            required
          />

          <label>
  City:
  <select
    name="city"
    value={profileData.city}
    onChange={handleProfileChange}
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
    onChange={handleProfileChange}
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
<form onSubmit={handlePasswordChange}>
  <label>Old Password:</label>
  <input
    type="password"
    name="oldPassword"
    value={passwordData.oldPassword}
    onChange={handlePasswordInput}
    required
  />

  <label>New Password:</label>
  <input
    type="password"
    name="newPassword"
    value={passwordData.newPassword}
    onChange={handlePasswordInput}
    required
    minLength={6}
  />

  <label>Confirm New Password:</label>
  <input
    type="password"
    name="confirmNewPassword"
    value={passwordData.confirmNewPassword}
    onChange={handlePasswordInput}
    required
    minLength={6}
  />

  <button type="submit" className="primary-btn">Change Password</button>
  {passwordMessage && <p className="message">{passwordMessage}</p>}
</form>

        <button onClick={handleDelete} className="secondary-btn">
          Delete Account
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
