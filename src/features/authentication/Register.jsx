import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";
import { registerUser } from "../../services/authService";

import "./Auth.css";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await registerUser({
        name: form.name,
        email: form.email,
        phone: null,
        password: form.password
      });

      alert(response.message || "Account Created");

      navigate("/");

    } catch (error) {

      alert(error.error);

    }

  };

  return (
    <div className="auth-container">

      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        <AppTextField
          label="Full Name"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          required
        />

        <AppTextField
          label="Email"
          type="email"
          placeholder="Enter your email"
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
          text="Register"
          height="45px"
        />

      </form>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>

    </div>
  );
}