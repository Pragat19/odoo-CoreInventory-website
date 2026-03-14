import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Receipts", path: "/receipts" },
    { name: "Delivery Orders", path: "/delivery" },
    { name: "Internal Transfers", path: "/transfers" },
    { name: "Stock Adjustment", path: "/adjustments" },
    { name: "Warehouse", path: "/warehouse" },
  ];

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

    </div>
  );
}