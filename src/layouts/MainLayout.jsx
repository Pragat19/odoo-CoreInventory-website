import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css";

export default function MainLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (

    <div className={`layout ${sidebarOpen ? "" : "collapsed"}`}>

      <Sidebar open={sidebarOpen} />

      <div className="layout-main">

        <Navbar toggleSidebar={toggleSidebar} />

        <div className="layout-content">
          {children}
        </div>

      </div>

    </div>

  );
}