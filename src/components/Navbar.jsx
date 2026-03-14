import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import "./css/Navbar.css";

export default function Navbar({ toggleSidebar }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/products": "Products",
    "/receipts": "Receipts",
    "/delivery": "Delivery Orders",
    "/transfers": "Internal Transfers",
    "/adjustments": "Stock Adjustment",
    "/ledger": "Stock Ledger",
    "/warehouses": "Warehouses",
    "/profile": "Profile"
  };

  const pageTitle = pageTitles[location.pathname] || "Inventory System";

  return (

    <div className="navbar">

      <div className="navbar-left">

        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={20}/>
        </button>

        <div className="navbar-title">
          {pageTitle}
        </div>

      </div>

      <div className="navbar-right">

        <div className="navbar-time">
          <span>{time.toLocaleDateString()}</span>
          <span>{time.toLocaleTimeString()}</span>
        </div>

        <div className="navbar-user">
          {user?.name || "User"}
        </div>

      </div>

    </div>

  );
}