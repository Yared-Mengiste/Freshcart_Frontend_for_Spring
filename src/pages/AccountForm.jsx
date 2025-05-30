import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import showObserver from "../animation";
import md5 from "blueimp-md5";
import data from "../json/data.json";
import "./home.css";

const AccountForm = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    showObserver();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSignIn) {
      const {
        name, email, password, confirmPassword, address, city, phone
      } = formData;

      if (!name || !email || !password || !confirmPassword || !address || !city || !phone) {
        setMessage("All fields are required.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      
    }

    try {
      const hashedPassword = md5(formData.password);

      const foundUser = users.find(
        (user) =>
          user.email.toLowerCase() === formData.email.toLowerCase() &&
          user.password === hashedPassword
      );

      if (foundUser) {
        setMessage("");
        login({ ...foundUser, password: formData.password }); // Keep plain password for session
        navigate("/");
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="wrappouter hidden-sec">
      <div className="signin">
        <div className="button-group">
          <button
            type="button"
            className={`signin-btn ${isSignIn ? "active" : "inactive"}`}
            onClick={() => setIsSignIn(true)}
          >
            <p>Sign In</p>
          </button>
          <h1>|</h1>
          <button
            type="button"
            className={`signin-btn ${!isSignIn ? "active" : "inactive"}`}
            onClick={() => setIsSignIn(false)}
          >
            <p>Sign Up</p>
          </button>
        </div>

        <div className="belowbutton">
          {message && <p className="message">{message}</p>}

          {isSignIn ? (
            <form className="sign-in-form" onSubmit={handleSubmit}>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button className="secondary-btn" type="submit">
                <p>Sign In</p>
              </button>
            </form>
          ) : (
            <form className="sign-up-form" onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  pattern="09[0-9]{8}"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                City:
                <select
                  name="city"
                  value={formData.city}
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
                  name="address"
                  value={formData.subcity}
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
              <button className="secondary-btn" type="submit">
                <p>Sign Up</p>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
