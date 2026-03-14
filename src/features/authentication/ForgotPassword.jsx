import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!email) return alert("Enter email");

    // Simulate OTP sending
    alert("OTP sent to email");

    navigate("/verify-otp");

  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <AppButton
            text="Send OTP"
            type="submit"
          />

        </form>

      </div>

    </div>
  );
}