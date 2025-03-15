import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/verify-otp");
    } catch (error) {
      console.error("Login failed"+error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="parent">
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="password" placeholder="Enter your password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
