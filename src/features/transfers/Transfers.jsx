import { useState, useEffect } from "react";
import AppButton from "../../components/AppButton";
import TransferForm from "./TransferForm";
import { FaEdit, FaTrash } from "react-icons/fa";


import {
  getTransfers,
  deleteTransfer
} from "../../services/internalTransferService";

import "./Transfers.css";

export default function Transfers() {

  const [transfers, setTransfers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  const fetchTransfers = async () => {

    const res = await getTransfers();

    if (res.status) {
      setTransfers(res.data);
    }

  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransfers();
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setSelectedTransfer(null);
    fetchTransfers();
  };

  const handleEdit = (transfer) => {
    setSelectedTransfer(transfer);
    setShowForm(true);
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this transfer?")) return;

    await deleteTransfer(id);
    fetchTransfers();

  };

  return (
    <div className="transfers-page">

      <div className="transfers-header">

        <h2>Internal Transfers</h2>

        <AppButton
          text="New Transfer"
          width="150px"
          onClick={() => {
            setSelectedTransfer(null);
            setShowForm(true);
          }}
        />

      </div>

      <div className="table-container">

        <div className="transfer-table">

          <div className="table-header">
            <div>Product</div>
            <div>From</div>
            <div>To</div>
            <div>Qty</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {transfers.length === 0 && (
            <div className="empty-row">
              No transfers found
            </div>
          )}

          {transfers.map((t) => (

            <div key={t.id} className="table-row">

              <div>{t.product?.name}</div>
              <div>{t.from_warehouse?.name}</div>
              <div>{t.to_warehouse?.name}</div>
              <div>{t.qty}</div>
              <div>{t.status}</div>

              <div className="action-icons">

                <FaEdit
                  onClick={() => handleEdit(t)}
                  style={{
                    cursor: "pointer",
                    color: "#2563eb",
                    fontSize: "18px",
                  }}
                  title="Edit"
                />

                <FaTrash
                  onClick={() => handleDelete(t.id)}
                  style={{
                    cursor: "pointer",
                    color: "#dc2626",
                    fontSize: "18px",
                  }}
                  title="Delete"
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {showForm && (
        <TransferForm
          transfer={selectedTransfer}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}