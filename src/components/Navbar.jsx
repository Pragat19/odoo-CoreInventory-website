import "./Navbar.css";

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">

      <div className="navbar-title">
        Inventory System
      </div>

      <div className="navbar-user">

        <span>
          {user?.name || "User"}
        </span>

      </div>

    </div>
  );
}