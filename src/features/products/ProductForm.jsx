import { useState } from "react";

import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";
import AppDropdown from "../../components/AppDropdown";

export default function ProductForm({
  product,
  onSave,
  onClose,
}) {

  const [form, setForm] = useState(
    product || {
      name: "",
      sku: "",
      category: "",
      stock: "",
      unit: "",
    }
  );

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(form);

  };

  const categories = [
    { label: "Raw Material", value: "raw" },
    { label: "Finished Goods", value: "finished" },
    { label: "Packaging", value: "packaging" },
  ];

  return (
    <div className="product-modal">

      <div className="product-form">

        <h3>
          {product ? "Edit Product" : "Add Product"}
        </h3>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <AppTextField
            label="SKU Code"
            value={form.sku}
            onChange={(e) =>
              setForm({ ...form, sku: e.target.value })
            }
            required
          />

          <AppDropdown
            label="Category"
            options={categories}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <AppTextField
            label="Stock Quantity"
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
          />

          <AppTextField
            label="Unit of Measure"
            placeholder="kg, pcs, box"
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>

            <AppButton
              text="Save Product"
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