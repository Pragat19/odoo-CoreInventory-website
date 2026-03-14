import { useState } from "react";

import AppTextField from "../../components/AppTextField";
import AppDropdown from "../../components/AppDropdown";
import AppButton from "../../components/AppButton";

export default function TransferForm({ onSave, onClose }) {

  const [form, setForm] = useState({
    product: "",
    fromLocation: "",
    toLocation: "",
    quantity: ""
  });

  const products = [
    { label: "Steel Rod", value: "Steel Rod" },
    { label: "Office Chair", value: "Office Chair" },
    { label: "Aluminium Sheet", value: "Aluminium Sheet" }
  ];

  const locations = [
    { label: "Main Warehouse", value: "Main Warehouse" },
    { label: "Production Floor", value: "Production Floor" },
    { label: "Rack A", value: "Rack A" },
    { label: "Rack B", value: "Rack B" }
  ];

  const handleSubmit = (e) => {

    e.preventDefault();

    if (form.fromLocation === form.toLocation) {
      alert("Source and destination cannot be same");
      return;
    }

    onSave(form);
  };

  return (
    <div className="transfer-modal">

      <div className="transfer-form">

        <h3>Create Transfer</h3>

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
            label="From Location"
            options={locations}
            value={form.fromLocation}
            onChange={(e) =>
              setForm({ ...form, fromLocation: e.target.value })
            }
          />

          <AppDropdown
            label="To Location"
            options={locations}
            value={form.toLocation}
            onChange={(e) =>
              setForm({ ...form, toLocation: e.target.value })
            }
          />

          <AppTextField
            label="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>

            <AppButton
              text="Validate Transfer"
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