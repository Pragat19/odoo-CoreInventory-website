import { useState } from "react";
import AppButton from "../../components/AppButton";
import AdjustmentForm from "./AdjustmentForm";
import "./Adjustments.css";

export default function Adjustments() {

  const [adjustments, setAdjustments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (adjustment) => {

    const systemStock = 100; // example system value

    const difference =
      adjustment.countedQuantity - systemStock;

    const newAdjustment = {
      ...adjustment,
      id: Date.now(),
      difference,
      status: "Validated"
    };

    setAdjustments([...adjustments, newAdjustment]);

    setShowForm(false);
  };

  return (
    <div className="adjustments-page">

      <div className="adjustments-header">

        <h2>Stock Adjustments</h2>

        <AppButton
          text="New Adjustment"
          width="160px"
          onClick={() => setShowForm(true)}
        />

      </div>

      <div className="adjustment-table">

        <div className="table-header">
          <div>Product</div>
          <div>Location</div>
          <div>Counted</div>
          <div>Difference</div>
          <div>Status</div>
        </div>

        {adjustments.length === 0 && (
          <div className="empty-row">
            No adjustments recorded
          </div>
        )}

        {adjustments.map((a) => (

          <div key={a.id} className="table-row">

            <div>{a.product}</div>
            <div>{a.location}</div>
            <div>{a.countedQuantity}</div>
            <div>{a.difference}</div>
            <div className="status-valid">
              {a.status}
            </div>

          </div>

        ))}

      </div>

      {showForm && (
        <AdjustmentForm
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}