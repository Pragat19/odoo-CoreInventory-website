import { useState, useEffect } from "react";
import AppTextField from "../../components/AppTextField";
import AppDropdown from "../../components/AppDropdown";
import AppButton from "../../components/AppButton";
import {
  storeDelivery,
  updateDelivery
} from "../../services/deliveryService";
import { getProducts } from "../../services/productService";

export default function DeliveryForm({ delivery, onSave, onClose }) {

  const [form, setForm] = useState({
    customer_name: "",
    product_id: "",
    qty: "",
    status: "pending"   // ✅ Default status
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    fetchProducts();

    if (delivery) {
      setForm({
        customer_name: delivery.customer_name,
        product_id: delivery.product_id,
        qty: delivery.qty,
        status: delivery.status || "pending"
      });
    }

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await getProducts();

      if (response.status) {

        const formatted = response.data.map((p) => ({
          label: p.name,
          value: p.id
        }));

        setProducts(formatted);
      }

    } catch (error) {
      alert(error.message);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (delivery) {

        const response = await updateDelivery(delivery.id, form);
        alert(response.message || "Updated successfully");

      } else {

        const response = await storeDelivery(form);
        alert(response.message || "Created successfully");

      }

      onSave();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="delivery-modal">

      <div className="delivery-form">

        <h3>
          {delivery ? "Edit Delivery" : "Create Delivery"}
        </h3>

        <form onSubmit={handleSubmit}>

          <AppTextField
            label="Customer Name"
            value={form.customer_name}
            onChange={(e) =>
              setForm({ ...form, customer_name: e.target.value })
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

          {/* ✅ STATUS DROPDOWN */}
          <AppDropdown
            label="Status"
            options={[
              { label: "Pending", value: "pending" },
              { label: "Delivered", value: "delivered" },
              { label: "Cancelled", value: "cancelled" }
            ]}
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>

            <AppButton
              text="Save"
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