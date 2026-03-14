/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";

import AppTextField from "../../components/AppTextField";
import AppDropdown from "../../components/AppDropdown";
import AppButton from "../../components/AppButton";

import {
  storeTransfer,
  updateTransfer
} from "../../services/internalTransferService";

import { getProducts } from "../../services/productService";
import { getWarehouses } from "../../services/warehouseService";

export default function TransferForm({ transfer, onSave, onClose }) {

  const isEdit = !!transfer;

  const [form, setForm] = useState({
    product_id: "",
    from_warehouse_id: "",
    to_warehouse_id: "",
    qty: "",
    status: "pending"
  });

  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {

    fetchProducts();
    fetchWarehouses();

    if (isEdit) {
      setForm({
        product_id: transfer.product_id,
        from_warehouse_id: transfer.from_warehouse_id,
        to_warehouse_id: transfer.to_warehouse_id,
        qty: transfer.qty,
        status: transfer.status
      });
    }

  }, [transfer]);

  const fetchProducts = async () => {
    const res = await getProducts();
    if (res.status) {
      setProducts(
        res.data.map(p => ({ label: p.name, value: p.id }))
      );
    }
  };

  const fetchWarehouses = async () => {
    const res = await getWarehouses();
    if (res.status) {
      setWarehouses(
        res.data.map(w => ({ label: w.name, value: w.id }))
      );
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (form.from_warehouse_id === form.to_warehouse_id) {
      alert("Source and destination cannot be same");
      return;
    }

    try {

      if (isEdit) {
        await updateTransfer(transfer.id, form);
        alert("Transfer updated successfully");
      } else {
        await storeTransfer(form);
        alert("Transfer created successfully");
      }

      onSave();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="transfer-modal">

      <div className="transfer-form">

        <h3>{isEdit ? "Edit Transfer" : "Create Transfer"}</h3>

        <form onSubmit={handleSubmit}>

          <AppDropdown
            label="Product"
            options={products}
            value={form.product_id}
            onChange={(e) =>
              setForm({ ...form, product_id: e.target.value })
            }
            required
          />

          <AppDropdown
            label="From Warehouse"
            options={warehouses}
            value={form.from_warehouse_id}
            onChange={(e) =>
              setForm({ ...form, from_warehouse_id: e.target.value })
            }
            required
          />

          <AppDropdown
            label="To Warehouse"
            options={warehouses}
            value={form.to_warehouse_id}
            onChange={(e) =>
              setForm({ ...form, to_warehouse_id: e.target.value })
            }
            required
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

          <AppDropdown
            label="Status"
            options={[
              { label: "Pending", value: "pending" },
              { label: "Done", value: "done" },
              { label: "Cancelled", value: "cancelled" }
            ]}
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

            <AppButton
              text={isEdit ? "Update" : "Save"}
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