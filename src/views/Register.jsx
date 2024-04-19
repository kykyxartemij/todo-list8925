import React, { useState } from "react";
import axios from "axios";

const Register = ({ setToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to create an account
    try {
      const createAccountResponse = await axios.post(
        "https://demo2.z-bit.ee/users",
        {
          username: formData.email,
          firstname: formData.name.split(" ")[0],
          lastname: formData.name.split(" ")[1] || "",
          newPassword: formData.password,
        }
      );
      console.log("Account created:", createAccountResponse.data);

      setSnackbarMessage("Registration successful");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        setToken(createAccountResponse.data.access_token);
      }, 1750);
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Registration failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="register-container">
      <div className="paper">
        <h5>Register</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      {snackbarOpen && (
        <div
          className="snackbar"
          style={{
            backgroundColor:
              snackbarSeverity === "error" ? "#d32f2f" : "#43a047",
          }}
          onClick={handleCloseSnackbar}
        >
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};

export default Register;
