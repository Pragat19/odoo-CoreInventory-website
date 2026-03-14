import { useState } from "react";

import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";
import AppDropdown from "../../components/AppDropdown";

export default function ReceiptForm({ onSave, onClose }) {

  const [form, setForm] = useState({
    supplier: "",
    product: "",
    quantity: "",
  });

  const products = [
    { label: "Steel Rod", value: "Steel Rod" },
    { label: "Office Chair", value: "Office Chair" },
    { label: "Aluminium Sheet", value: "Aluminium Sheet" }
  ];

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(form);

  };

  return (
    <div className="receipt-modal">

      <div className="receipt-form">

        <h3>Create Receipt</h3>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="Supplier Name"
            value={form.supplier}
            onChange={(e) =>
              setForm({ ...form, supplier: e.target.value })
            }
            required
          />

          <AppDropdown
            label="Product"
            options={products}
            value={form.product}
            onChange={(e) =>
              setForm({ ...form, product: e.target.value })
            }
          />

          <AppTextField
            label="Quantity Received"
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            required
          />

          <div style={{ display: "flex", gap: "10px" }}>

            <AppButton
              text="Validate Receipt"
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