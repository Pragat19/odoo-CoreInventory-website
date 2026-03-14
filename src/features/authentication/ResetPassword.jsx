import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

export default function ResetPassword(){

  const navigate = useNavigate();

  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const handleSubmit = (e)=>{

    e.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    alert("Password updated successfully");

    navigate("/login");

  };

  return(

    <div className="auth-container">

      <div className="auth-card">

        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            isPassword
          />

          <AppTextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
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