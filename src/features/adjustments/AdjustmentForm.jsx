import { useState } from "react";

import AppDropdown from "../../components/AppDropdown";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

export default function AdjustmentForm({ onSave, onClose }) {

  const [form, setForm] = useState({
    product: "",
    location: "",
    countedQuantity: ""
  });

  const products = [
    { label: "Steel Rod", value: "Steel Rod" },
    { label: "Office Chair", value: "Office Chair" },
    { label: "Aluminium Sheet", value: "Aluminium Sheet" }
  ];

  const locations = [
    { label: "Main Warehouse", value: "Main Warehouse" },
    { label: "Production Floor", value: "Production Floor" },
    { label: "Rack A", value: "Rack A" }
  ];

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave({
      ...form,
      countedQuantity: Number(form.countedQuantity)
    });

  };

  return (
    <div className="adjustment-modal">

      <div className="adjustment-form">

        <h3>Stock Adjustment</h3>

        <form onSubmit={handleSubmit}>

          <AppDropdown
            label="Product"
            options={products}
            value={form.product}
            onChange={(e) =>
              setForm({ ...form, product: e.target.value })
            }
          />

          <AppDropdown
            label="Location"
            options={locations}
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <AppTextField
            label="Counted Quantity"
            type="number"
            value={form.countedQuantity}
            onChange={(e) =>
              setForm({
                ...form,
                countedQuantity: e.target.value
              })
            }
            required
          />

          <div style={{ display: "flex", gap: "10px" }}>

            <AppButton
              text="Validate Adjustment"
              type="submit"
            />

            <AppButton
              text="Cancel"
              backgroundColor="#6b7280"
              hoverColor="#4b5563"
              onClick={onClose}
            />

          </div>

        </form>

      </div>

    </div>
  );
}