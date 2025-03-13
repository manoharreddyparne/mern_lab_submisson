import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/signup", formData);
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      console.error("Signup failed"+err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="parent">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="username" placeholder="Enter your name" required value={formData.username} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="password" placeholder="Enter your password" required onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
