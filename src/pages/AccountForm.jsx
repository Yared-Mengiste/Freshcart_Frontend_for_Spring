import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import showObserver from "../animation";
import axiosInstance from "../api/axiosInstance.js";
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
    subcity: "",
    city: "",
    phoneNo: "",
  });

  useEffect(() => {
    showObserver();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let requestData;

    if (!isSignIn) {
      const { name, email, password, confirmPassword, subcity, city, phoneNo } =
        formData;

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !subcity ||
        !city ||
        !phoneNo
      ) {
        setMessage("All fields are required.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }
      if (password < 6) {
        setMessage("Password must be at least 6 characters long.");
        return;
      }

      requestData = formData;
    } else {
      const { email, password } = formData;

      if (!email || !password) {
        setMessage("Email and password are required.");
        return;
      }

      requestData = { email, password };
    }

    try {
      let response;
      if (isSignIn) {
        const url = "user/login";
        response = await axiosInstance.post(url, requestData);
      } else {
        const url = "user/signup";
        response = await axiosInstance.post(url, requestData);
      }

      if (response.data.message === "Login successful") {
        login({ user: response.data.user, token: response.data.token });
        navigate("/");
      } else if (response.data.message === "Sign-up successful") {
        setMessage("Sign-up successful! Please log in.");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          subcity: "",
          city: "",
          phoneNo: "",
        });
        setIsSignIn(true);
      } else {
        setMessage(response.data.message || "Something happened.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
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
                phone:
                <input
                  type="text"
                  name="phoneNo"
                  pattern="09[0-9]{8}"
                  value={formData.phoneNo}
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
                  name="subcity"
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
