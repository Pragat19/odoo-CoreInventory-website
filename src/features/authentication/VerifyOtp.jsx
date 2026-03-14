import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";
import { verifyOtp } from "../../services/authService";

export default function VerifyOtp() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  // Get email (saved from forgot password page)
  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {
      alert("Email not found. Please try again.");
      return;
    }

    try {

      const response = await verifyOtp(email, otp);

      alert(response.message || "OTP Verified Successfully");
      localStorage.setItem("resetOtp", otp);

      navigate("/reset-password");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Verify OTP</h2>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <AppButton
            text="Verify OTP"
            type="submit"
          />

        </form>

      </div>

    </div>
  );
}