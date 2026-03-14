/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import AppTextField from "../../components/AppTextField";
import AppDropdown from "../../components/AppDropdown";
import AppButton from "../../components/AppButton";

import {
  storeStockAdjustment,
  updateStockAdjustment
} from "../../services/stockAdjustmentService";

import { getProducts } from "../../services/productService";
import { getWarehouses } from "../../services/warehouseService";

export default function StockAdjustmentForm({ adjustment, onSave, onClose }) {

  const isEdit = !!adjustment;

  const [form, setForm] = useState({
    product_id: "",
    location_id: "",
    counted: "",
    status: "draft"   // ✅ default status
  });

  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {

    fetchProducts();
    fetchLocations();

    if (isEdit) {
      setForm({
        product_id: adjustment.product_id,
        location_id: adjustment.location_id,
        counted: adjustment.counted,
        status: adjustment.status || "draft"
      });
    }

  }, [adjustment]);

  const fetchProducts = async () => {
    const res = await getProducts();
    if (res.status) {
      setProducts(res.data.map(p => ({
        label: p.name,
        value: p.id
      })));
    }
  };

  const fetchLocations = async () => {
    const res = await getWarehouses();
    if (res.status) {
      setLocations(res.data.map(l => ({
        label: l.name,
        value: l.id
      })));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.product_id || !form.location_id || !form.counted) {
      alert("Please fill all fields");
      return;
    }

    try {

      if (isEdit) {
        await updateStockAdjustment(adjustment.id, form);
        alert("Stock adjustment updated");
      } else {
        await storeStockAdjustment(form);
        alert("Stock adjustment created");
      }

      onSave();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="transfer-modal">

      <div className="transfer-form">

        <h3>{isEdit ? "Edit Stock Adjustment" : "Create Stock Adjustment"}</h3>

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
            label="Location"
            options={locations}
            value={form.location_id}
            onChange={(e) =>
              setForm({ ...form, location_id: e.target.value })
            }
            required
          />

          {/* ✅ STATUS DROPDOWN */}
          <AppDropdown
            label="Status"
            options={[
              { label: "Draft", value: "draft" },
              { label: "Validated", value: "validated" },
              { label: "Cancelled", value: "cancelled" }
            ]}
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          />

          <AppTextField
            label="Counted Quantity"
            type="number"
            value={form.counted}
            onChange={(e) =>
              setForm({ ...form, counted: e.target.value })
            }
            required
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