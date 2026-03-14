import { useEffect, useState } from "react";
import KpiCard from "./KpiCard";
import "./Dashboard.css";

import {
  Boxes,
  AlertTriangle,
  Truck,
  PackageCheck,
  ArrowRightLeft
} from "lucide-react";

import { apiRequest } from "../../services/api";

export default function Dashboard() {

  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {

    try {

      const res = await apiRequest("dashboard", "GET");

      if (res.status) {
        setKpis(res.data);
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <h3 style={{ padding: "20px" }}>Loading Dashboard...</h3>;
  }

  return (

    <div className="dashboard-page">

      <h2>Inventory Dashboard</h2>

      <div className="kpi-grid">

        <KpiCard
          title="Total Products"
          value={kpis?.total_products}
          color="#2563eb"
          icon={<Boxes size={22} />}
        />

        <KpiCard
          title="Low Stock Items"
          value={kpis?.low_stock_items}
          color="#dc2626"
          icon={<AlertTriangle size={22} />}
        />

        <KpiCard
          title="Total Receipts"
          value={kpis?.total_receipts}
          color="#9333ea"
          icon={<PackageCheck size={22} />}
        />

        <KpiCard
          title="Pending Deliveries"
          value={kpis?.pending_deliveries}
          color="#ea580c"
          icon={<Truck size={22} />}
        />

        <KpiCard
          title="Total Transfers"
          value={kpis?.total_transfers}
          color="#16a34a"
          icon={<ArrowRightLeft size={22} />}
        />

      </div>

    </div>

  );

}