import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";
import "./Auth.css";
import { loginUser } from "../../services/authService";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email: form.email,
        password: form.password,
      });

      // If backend returns token, save it
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      alert("Login successful");
      navigate("/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <AppTextField
          label="Email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <AppTextField
          label="Password"
          isPassword
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <div className="forgot-row">
          <p
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>

        <AppButton
          type="submit"
          text="Login"
        />

      </form>

      <p>
        Don't have account? <Link to="/register">Register</Link>
      </p>

    </div>
  );
}