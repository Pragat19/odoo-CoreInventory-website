import { useState } from "react";
import AppButton from "../../components/AppButton";
import TransferForm from "./TransferForm";
import "./Transfers.css";

export default function Transfers() {

  const [transfers, setTransfers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (transfer) => {

    const newTransfer = {
      ...transfer,
      id: Date.now(),
      status: "Done"
    };

    setTransfers([...transfers, newTransfer]);

    setShowForm(false);
  };

  return (
    <div className="transfers-page">

      <div className="transfers-header">

        <h2>Internal Transfers</h2>

        <AppButton
          text="New Transfer"
          width="150px"
          onClick={() => setShowForm(true)}
        />

      </div>

      <div className="transfer-table">

        <div className="table-header">
          <div>Product</div>
          <div>From</div>
          <div>To</div>
          <div>Quantity</div>
          <div>Status</div>
        </div>

        {transfers.length === 0 && (
          <div className="empty-row">
            No transfers created
          </div>
        )}

        {transfers.map((t) => (

          <div key={t.id} className="table-row">

            <div>{t.product}</div>
            <div>{t.fromLocation}</div>
            <div>{t.toLocation}</div>
            <div>{t.quantity}</div>
            <div className="status-done">{t.status}</div>

          </div>

        ))}

      </div>

      {showForm && (
        <TransferForm
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}