import { useEffect, useState } from "react";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

import {
  getProfile,
  updateProfile
} from "../../services/profileService";

export default function MyProfile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(true);

  // 📥 Load profile from API
  const fetchProfile = async () => {

    try {

      const res = await getProfile();

      if (res.status) {
        setUser(res.user);
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 💾 Save profile
  const handleSave = async () => {

    try {

      const res = await updateProfile(user);

      if (res.status) {
        alert("Profile updated successfully");
        fetchProfile(); // refresh data
      }

    } catch (error) {
      alert(error.message);
    }

  };

  if (loading) {
    return <h3 style={{ padding: "20px" }}>Loading profile...</h3>;
  }

  return (

    <div style={{ padding: "20px" }}>

      <h2>My Profile</h2>

      <div style={{ maxWidth: "400px", marginTop: "20px" }}>

        <AppTextField
          label="Name"
          value={user.name || ""}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />

        <AppTextField
          label="Email"
          value={user.email || ""}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        <AppTextField
          label="Phone"
          value={user.phone || ""}
          onChange={(e) =>
            setUser({ ...user, phone: e.target.value })
          }
        />

        <div style={{ marginTop: "15px" }}>

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