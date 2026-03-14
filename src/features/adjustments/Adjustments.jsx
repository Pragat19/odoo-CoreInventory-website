/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import AppButton from "../../components/AppButton";
import StockAdjustmentForm from "./AdjustmentForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getStockAdjustments,
  deleteStockAdjustment
} from "../../services/stockAdjustmentService";

import "./Adjustments.css";

export default function Adjustments() {

  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    const res = await getStockAdjustments();
    if (res.status) {
      setItems(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setSelected(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setSelected(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this adjustment?")) return;
    await deleteStockAdjustment(id);
    fetchData();
  };

  return (
    <div className="transfers-page">

      <div className="transfers-header">

        <h2>Stock Adjustments</h2>

        <AppButton
          text="New Adjustment"
          width="170px"
          onClick={() => {
            setSelected(null);
            setShowForm(true);
          }}
        />

      </div>

      <div className="table-container">

        <div className="transfer-table">

          <div className="table-header">
            <div>Product</div>
            <div>Location</div>
            <div>Counted</div>
            <div>Difference</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {items.length === 0 && (
            <div className="empty-row">
              No stock adjustments found
            </div>
          )}

          {items.map((a) => (

            <div key={a.id} className="table-row">

              <div>{a.product?.name}</div>
              <div>{a.location?.name}</div>
              <div>{a.counted}</div>
              <div>{a.difference}</div>
              <div>{a.status}</div>

              <div className="action-icons">

                {/* Edit Icon */}
                <FaEdit
                  onClick={() => handleEdit(a)}
                  style={{
                    cursor: "pointer",
                    color: "#2563eb",
                    fontSize: "18px",
                  }}
                  title="Edit"
                />

                <FaTrash
                  onClick={() => handleDelete(a.id)}
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
        <StockAdjustmentForm
          adjustment={selected}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}