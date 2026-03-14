import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

export default function MainLayout({ children }) {

  return (
    <div className="main-layout">

      <Sidebar />

      <div className="layout-content">

        <Navbar />

        <div className="page-content">
          {children}
        </div>

      </div>

    </div>
  );
}