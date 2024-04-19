import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = ({ setToken }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="auth-container">
      <div className="tabs-container">
        <button
          className={`tab ${tabIndex === 0 ? "active" : ""}`}
          onClick={() => handleTabChange(0)}
        >
          Login
        </button>
        <button
          className={`tab ${tabIndex === 1 ? "active" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Register
        </button>
      </div>
      <h1 className="title">Todo List</h1>
      {tabIndex === 0 && <Login setToken={setToken} />}
      {tabIndex === 1 && <Register setToken={setToken} />}
    </div>
  );
};

export default Auth;
