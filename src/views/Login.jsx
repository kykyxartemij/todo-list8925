import React, { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to create an account
    try {
      const getAuthTokenResponse = await axios.post(
        "https://demo2.z-bit.ee/users/get-token",
        {
          username: formData.email,
          password: formData.password,
        }
      );
      console.log("Authentication token:", getAuthTokenResponse.data);


      setTimeout(() => {
        setToken(getAuthTokenResponse.data.access_token);
      }, 1750);
    } catch (error) {
      console.error("Error:", error);

    }
  };

  return (
    <div className="container">
      <div className="paper">
        <h5>Login</h5>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign In</button>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
