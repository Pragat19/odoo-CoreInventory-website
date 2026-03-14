import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

export default function VerifyOtp(){

  const navigate = useNavigate();

  const [otp,setOtp] = useState("");

  const handleSubmit = (e)=>{

    e.preventDefault();

    if(otp !== "123456"){
      alert("Invalid OTP");
      return;
    }

    navigate("/reset-password");

  };

  return(

    <div className="auth-container">

      <div className="auth-card">

        <h2>Verify OTP</h2>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
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