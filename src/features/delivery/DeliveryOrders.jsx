import { useState, useEffect } from "react";
import AppButton from "../../components/AppButton";
import DeliveryForm from "./DeliveryForm";
import "./Delivery.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  getDeliveries,
  deleteDelivery
} from "../../services/deliveryService";

export default function DeliveryOrders() {

  const [deliveries, setDeliveries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingDelivery, setEditingDelivery] = useState(null);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {

    try {

      const response = await getDeliveries();

      if (response.status) {
        setDeliveries(response.data);
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

  };

  const handleSave = () => {
    fetchDeliveries();
    setShowForm(false);
    setEditingDelivery(null);
  };

  const handleEdit = (delivery) => {
    setEditingDelivery(delivery);
    setShowForm(true);
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this delivery order?")) return;

    try {

      const response = await deleteDelivery(id);

      alert(response.message || "Deleted successfully");

      fetchDeliveries();

    } catch (error) {
      alert(error.message);
    }

  };

  return (
    <div className="delivery-page">

      <div className="delivery-header">
        <h2>Delivery Orders</h2>

        <AppButton
          text="New Delivery"
          width="150px"
          onClick={() => setShowForm(true)}
        />
      </div>

      <div className="delivery-table">

        <div className="table-header">
          <div>Customer</div>
          <div>Product</div>
          <div>Quantity</div>
          <div>Status</div>
          <div style={{ textAlign: "center" }}>Action</div>
        </div>

        {loading && (
          <div className="empty-row">Loading...</div>
        )}

        {!loading && deliveries.length === 0 && (
          <div className="empty-row">
            No delivery orders found
          </div>
        )}

        {deliveries.map((d) => (

          <div key={d.id} className="table-row">

            <div>{d.customer_name}</div>
            <div>{d.product?.name}</div>
            <div>-{d.qty}</div>

            <div className="status-pending">
              {d.status}
            </div>

            <div className="table-actions">
              <FaEdit
                className="edit-icon"
                title="Edit"
                onClick={() => handleEdit(d)}
              />

              <FaTrash
                onClick={() => handleDelete(d.id)}
                className="delete-icon"
                title="Delete"
              />


            </div>

          </div>

        ))}

      </div>

      {showForm && (
        <DeliveryForm
          delivery={editingDelivery}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingDelivery(null);
          }}
        />
      )}

    </div>
  );
}