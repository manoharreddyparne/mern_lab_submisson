import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email"); 
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  if (!email) {
    return <p>Error: No email found. Please sign up again.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/verify-otp", { email, otp });
      console.log("OTP Verified:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("OTP verification error:", err.response?.data || err);
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
