import "./Dashboard.css";

export default function KpiCard({ title, value, color, icon }) {

  return (
    <div className="kpi-card">

      <div className="kpi-header">

        <div className="kpi-title">
          {title}
        </div>

        <div
          className="kpi-icon"
          style={{ color }}
        >
          {icon}
        </div>

      </div>

      <div
        className="kpi-value"
        style={{ color }}
      >
        {value}
      </div>

    </div>
  );

}