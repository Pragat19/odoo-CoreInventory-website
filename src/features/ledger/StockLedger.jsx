import { useState } from "react";
import LedgerTable from "./LedgerTable";
import "./Ledger.css";

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

  return (
    <div className="ledger-page">

      <div className="ledger-header">
        <h2>Stock Ledger</h2>
      </div>

      <LedgerTable data={ledger} />

    </div>
  );
}