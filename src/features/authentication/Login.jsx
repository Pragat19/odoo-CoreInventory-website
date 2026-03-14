import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

import "./Auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (
      user &&
      user.email === form.email &&
      user.password === form.password
    ) {
      alert("Login successful");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
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
          onChange={(e)=>setForm({...form,email:e.target.value})}
          required
        />

        <AppTextField
          label="Password"
          isPassword
          placeholder="Enter password"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
          required
        />

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