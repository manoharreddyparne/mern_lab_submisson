import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/verify-otp", { email: state.email, otp });
      navigate("/login");
    } catch (error) {
      console.error("OTP verification failed"+error);
    }
  };

  return (
    <div className="parent">
      <form onSubmit={handleSubmit}>
        <label>Enter OTP:</label>
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
