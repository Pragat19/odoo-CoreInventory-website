import { useState } from "react";
import AppButton from "../../components/AppButton";
import ReceiptForm from "./ReceiptForm";
import "./Receipts.css";

export default function Receipts() {

  const [receipts, setReceipts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (receipt) => {

    const newReceipt = {
      ...receipt,
      id: Date.now(),
      status: "Done"
    };

    setReceipts([...receipts, newReceipt]);

    setShowForm(false);
  };

  return (
    <div className="receipts-page">

      <div className="receipts-header">

        <h2>Receipts (Incoming Goods)</h2>

        <AppButton
          text="New Receipt"
          width="150px"
          onClick={() => setShowForm(true)}
        />

      </div>

      {/* Table */}

      <div className="receipt-table">

        <div className="table-header">
          <div>Supplier</div>
          <div>Product</div>
          <div>Quantity</div>
          <div>Status</div>
        </div>

        {receipts.length === 0 && (
          <div className="empty-row">
            No receipts created
          </div>
        )}

        {receipts.map((r) => (

          <div key={r.id} className="table-row">

            <div>{r.supplier}</div>
            <div>{r.product}</div>
            <div>+{r.quantity}</div>
            <div className="status-done">{r.status}</div>

          </div>

        ))}

      </div>

      {showForm && (
        <ReceiptForm
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}