import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

export default function ResetPassword() {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    const otp = localStorage.getItem("resetOtp"); // if you saved it

    if (!email) {
      alert("Email not found. Please restart process.");
      return;
    }

    try {

      const response = await resetPassword({
        email,
        otp,
        new_password: password,
        new_password_confirmation: confirmPassword,
      });

      alert(response.message || "Password updated successfully");

      // Clear reset data
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOtp");

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword
          />

          <AppTextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isPassword
          />

          <AppButton
            text="Update Password"
            type="submit"
          />

        </form>

      </div>

    </div>

  );

}