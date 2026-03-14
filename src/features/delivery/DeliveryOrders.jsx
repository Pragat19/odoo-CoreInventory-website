import { useState } from "react";
import AppButton from "../../components/AppButton";
import DeliveryForm from "./DeliveryForm";
import "./Delivery.css";

export default function DeliveryOrders() {

  const [deliveries, setDeliveries] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (delivery) => {

    const newDelivery = {
      ...delivery,
      id: Date.now(),
      status: "Shipped"
    };

    setDeliveries([...deliveries, newDelivery]);

    setShowForm(false);
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
        </div>

        {deliveries.length === 0 && (
          <div className="empty-row">
            No delivery orders created
          </div>
        )}

        {deliveries.map((d) => (

          <div key={d.id} className="table-row">

            <div>{d.customer}</div>
            <div>{d.product}</div>
            <div>-{d.quantity}</div>
            <div className="status-shipped">{d.status}</div>

          </div>

        ))}

      </div>

      {showForm && (
        <DeliveryForm
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}