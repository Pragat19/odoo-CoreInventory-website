import { useState } from "react";

import AppTextField from "../../components/AppTextField";
import AppDropdown from "../../components/AppDropdown";
import AppButton from "../../components/AppButton";

export default function DeliveryForm({ onSave, onClose }) {

  const [form, setForm] = useState({
    customer: "",
    product: "",
    quantity: ""
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
    <div className="delivery-modal">

      <div className="delivery-form">

        <h3>Create Delivery Order</h3>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="Customer Name"
            value={form.customer}
            onChange={(e) =>
              setForm({ ...form, customer: e.target.value })
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
            label="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            required
          />

          <div style={{ display: "flex", gap: "10px" }}>

            <AppButton
              text="Validate Delivery"
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