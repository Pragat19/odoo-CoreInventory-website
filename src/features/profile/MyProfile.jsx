import { useEffect, useState } from "react";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

export default function MyProfile(){

  const [user,setUser] = useState({
    name:"",
    email:""
  });

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(storedUser);
    }
  },[]);

  const handleSave = () => {

    localStorage.setItem("user",JSON.stringify(user));
    alert("Profile updated");

  };

  return(

    <div style={{padding:"20px"}}>

      <h2>My Profile</h2>

      <div style={{maxWidth:"400px",marginTop:"20px"}}>

        <AppTextField
          label="Name"
          value={user.name}
          onChange={(e)=>setUser({...user,name:e.target.value})}
        />

        <AppTextField
          label="Email"
          value={user.email}
          onChange={(e)=>setUser({...user,email:e.target.value})}
        />

        <div style={{marginTop:"15px"}}>
          <AppButton
            text="Save Changes"
            onClick={handleSave}
            width="180px"
          />
        </div>

      </div>

    </div>

  );

}