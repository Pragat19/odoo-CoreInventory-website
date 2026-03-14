import { NavLink, useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import "./css/Sidebar.css";
import { LogOut } from "lucide-react";

export default function Sidebar() {

  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Receipts", path: "/receipts" },
    { name: "Delivery Orders", path: "/delivery" },
    { name: "Internal Transfers", path: "/transfers" },
    { name: "Stock Adjustment", path: "/adjustments" },
    { name: "Stock Ledger", path: "/ledger" },
    { name: "Warehouse", path: "/warehouses" },
    { name: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {

    localStorage.removeItem("user");
    navigate("/login");

  };

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        CoreInventory
      </div>

      <div className="sidebar-menu">

        {menu.map((item, index) => (

          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            {item.name}
          </NavLink>

        ))}

      </div>

      {/* Logout Button */}
      <div className="sidebar-logout">

        <AppButton
          text="Logout"
          onClick={handleLogout}
          backgroundColor="white"
          hoverColor="#f3f4f6"
          textColor="red"
          border="none"
          prefixIcon={<LogOut size={18} />}
        />

      </div>

    </div>
  );
}