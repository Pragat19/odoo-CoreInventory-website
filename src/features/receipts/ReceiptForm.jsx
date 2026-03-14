import { useState, useEffect } from "react";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";
import AppDropdown from "../../components/AppDropdown";
import {
  storeReceipt,
  updateReceipt
} from "../../services/receiptService";

import { getProducts } from "../../services/productService";

export default function ReceiptForm({
  receipt,
  onSave,
  onClose
}) {

  const [form, setForm] = useState({
    supplier_name: "",
    product_id: "",
    qty: ""
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    fetchProducts();

    if (receipt) {
      setForm(receipt);
    }

  }, []);

  const fetchProducts = async () => {

    const response = await getProducts();

    if (response.status) {

      const formatted = response.data.map((p) => ({
        label: p.name,
        value: p.id
      }));

      setProducts(formatted);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (receipt) {

        await updateReceipt(receipt.id, form);

        alert("Receipt updated");

      } else {

        await storeReceipt(form);

        alert("Receipt created");

      }

      onSave();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="receipt-modal">
      <div className="receipt-form">

        <h3>{receipt ? "Edit Receipt" : "Create Receipt"}</h3>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="Supplier Name"
            value={form.supplier_name}
            onChange={(e) =>
              setForm({ ...form, supplier_name: e.target.value })
            }
            required
          />

          <AppDropdown
            label="Product"
            options={products}
            value={form.product_id}
            onChange={(e) =>
              setForm({ ...form, product_id: e.target.value })
            }
          />

          <AppTextField
            label="Quantity"
            type="number"
            value={form.qty}
            onChange={(e) =>
              setForm({ ...form, qty: e.target.value })
            }
            required
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <AppButton text="Save" type="submit" />
            <AppButton
              text="Cancel"
              backgroundColor="#6b7280"
              onClick={onClose}
            />
          </div>

        </form>

      </div>
    </div>
  );
}