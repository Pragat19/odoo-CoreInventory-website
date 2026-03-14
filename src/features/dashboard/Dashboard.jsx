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

export default function Dashboard() {

  const [kpis, setKpis] = useState({
    totalProducts: 0,
    lowStock: 0,
    pendingReceipts: 0,
    pendingDeliveries: 0,
    transfers: 0
  });

  useEffect(() => {

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const receipts = JSON.parse(localStorage.getItem("receipts")) || [];
    const deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
    const transfers = JSON.parse(localStorage.getItem("transfers")) || [];

    const lowStockCount = products.filter(p => p.stock <= 5).length;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKpis({
      totalProducts: products.length,
      lowStock: lowStockCount,
      pendingReceipts: receipts.filter(r => r.status !== "Done").length,
      pendingDeliveries: deliveries.filter(d => d.status !== "Shipped").length,
      transfers: transfers.length
    });

  }, []);

  return (

    <div className="dashboard-page">

      <h2>Inventory Dashboard</h2>

      <div className="kpi-grid">

        <KpiCard
          title="Total Products"
          value={kpis.totalProducts}
          color="#2563eb"
          icon={<Boxes size={22} />}
        />

        <KpiCard
          title="Low Stock Items"
          value={kpis.lowStock}
          color="#dc2626"
          icon={<AlertTriangle size={22} />}
        />

        <KpiCard
          title="Pending Receipts"
          value={kpis.pendingReceipts}
          color="#9333ea"
          icon={<PackageCheck size={22} />}
        />

        <KpiCard
          title="Pending Deliveries"
          value={kpis.pendingDeliveries}
          color="#ea580c"
          icon={<Truck size={22} />}
        />

        <KpiCard
          title="Internal Transfers"
          value={kpis.transfers}
          color="#16a34a"
          icon={<ArrowRightLeft size={22} />}
        />

      </div>

    </div>

  );

}