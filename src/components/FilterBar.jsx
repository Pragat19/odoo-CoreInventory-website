import AppDropdown from "./AppDropdown";
import "./css/FilterBar.css";

export default function FilterBar({ filters, setFilters }) {

  return (

      <div className="filter-bar">

        <AppDropdown
          label="Document Type"
          value={filters.type}
          options={[
            { label: "All", value: "" },
            { label: "Receipts", value: "receipt" },
            { label: "Delivery", value: "delivery" },
            { label: "Transfer", value: "transfer" },
            { label: "Adjustment", value: "adjustment" }
          ]}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
        />

        <AppDropdown
          label="Status"
          value={filters.status}
          options={[
            { label: "All", value: "" },
            { label: "Draft", value: "draft" },
            { label: "Waiting", value: "waiting" },
            { label: "Ready", value: "ready" },
            { label: "Done", value: "done" },
            { label: "Canceled", value: "canceled" }
          ]}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        />

        <AppDropdown
          label="Warehouse"
          value={filters.warehouse}
          options={[
            { label: "All", value: "" },
            { label: "Main Warehouse", value: "main" },
            { label: "Production", value: "production" }
          ]}
          onChange={(e) =>
            setFilters({ ...filters, warehouse: e.target.value })
          }
        />

      </div>
  );

}