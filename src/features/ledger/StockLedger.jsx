import { useState } from "react";
import LedgerTable from "./LedgerTable";
import "./Ledger.css";
import FilterBar from "../../components/FilterBar";

export default function StockLedger() {

  const [ledger] = useState([
    {
      id: 1,
      date: "12 Mar 2026",
      product: "Steel Rod",
      type: "Receipt",
      from: "Vendor",
      to: "Main Warehouse",
      quantity: 50
    },
    {
      id: 2,
      date: "13 Mar 2026",
      product: "Steel Rod",
      type: "Transfer",
      from: "Main Warehouse",
      to: "Rack A",
      quantity: 20
    },
    {
      id: 3,
      date: "14 Mar 2026",
      product: "Office Chair",
      type: "Delivery",
      from: "Warehouse",
      to: "ABC Company",
      quantity: -10
    },
    {
      id: 4,
      date: "15 Mar 2026",
      product: "Steel Rod",
      type: "Adjustment",
      from: "Rack A",
      to: "-",
      quantity: -3
    }
  ]);

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    warehouse: ""
  });

  const filteredData = ledger.filter(item => {

    if (filters.type && item.type !== filters.type)
      return false;

    if (filters.status && item.status !== filters.status)
      return false;

    if (filters.warehouse && item.warehouse !== filters.warehouse)
      return false;

    return true;

  });

  return (
    <div className="ledger-page">

      <div className="ledger-header">
        <h2>Stock Ledger</h2>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />
      <LedgerTable data={filteredData} />

    </div>
  );
}