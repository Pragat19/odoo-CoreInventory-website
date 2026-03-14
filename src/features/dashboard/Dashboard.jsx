import React from "react";
import "./Dashboard.css";

export default function Dashboard() {

  const stats = [
    {
      title: "Total Products",
      value: 128
    },
    {
      title: "Low Stock Items",
      value: 6
    },
    {
      title: "Pending Receipts",
      value: 3
    },
    {
      title: "Pending Deliveries",
      value: 4
    },
    {
      title: "Internal Transfers",
      value: 2
    }
  ];

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Inventory Dashboard</h2>
        <p>Overview of your warehouse operations</p>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-kpi-grid">

        {stats.map((item, index) => (
          <div key={index} className="kpi-card">

            <div className="kpi-title">
              {item.title}
            </div>

            <div className="kpi-value">
              {item.value}
            </div>

          </div>
        ))}

      </div>

      {/* Activity Section */}
      <div className="dashboard-section">

        <h3>Recent Activity</h3>

        <div className="activity-table">

          <div className="activity-row header">
            <div>Operation</div>
            <div>Product</div>
            <div>Quantity</div>
            <div>Status</div>
          </div>

          <div className="activity-row">
            <div>Receipt</div>
            <div>Steel Rod</div>
            <div>+50</div>
            <div className="status done">Done</div>
          </div>

          <div className="activity-row">
            <div>Delivery</div>
            <div>Office Chair</div>
            <div>-10</div>
            <div className="status waiting">Waiting</div>
          </div>

          <div className="activity-row">
            <div>Transfer</div>
            <div>Aluminium Sheet</div>
            <div>20</div>
            <div className="status ready">Ready</div>
          </div>

        </div>

      </div>

    </div>
  );
}