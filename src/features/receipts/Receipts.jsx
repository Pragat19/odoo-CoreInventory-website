import { useState, useEffect } from "react";
import AppButton from "../../components/AppButton";
import ReceiptForm from "./ReceiptForm";
import "./Receipts.css";
import { getReceipts, deleteReceipt } from "../../services/receiptService";
import { FaTrash } from "react-icons/fa";

export default function Receipts() {

  const [receipts, setReceipts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch Receipts
  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {

    try {

      const response = await getReceipts();

      if (response.status) {
        setReceipts(response.data);
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

  };

  const handleSave = () => {
    fetchReceipts();
    setShowForm(false);
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this receipt?")) {
      return;
    }

    try {

      const response = await deleteReceipt(id);

      alert(response.message || "Deleted successfully");

      fetchReceipts();

    } catch (error) {
      alert(error.message);
    }

  };

  return (
    <div className="receipts-page">

      {/* Header */}
      <div className="receipts-header">
        <h2>Receipts (Incoming Goods)</h2>

        <AppButton
          text="New Receipt"
          width="150px"
          onClick={() => setShowForm(true)}
        />
      </div>

      {/* Table */}
      <div className="receipt-table">

        <div className="table-header">
          <div>Supplier</div>
          <div>Product</div>
          <div>Quantity</div>
          <div>Status</div>
          <div style={{ textAlign: "center" }}>Action</div>
        </div>

        {loading && (
          <div className="empty-row">Loading...</div>
        )}

        {!loading && receipts.length === 0 && (
          <div className="empty-row">
            No receipts found
          </div>
        )}

        {receipts.map((r) => (

          <div key={r.id} className="table-row">

            <div>{r.supplier_name}</div>
            <div>{r.product?.name}</div>
            <div>+{r.qty}</div>

            <div className="status-done">
              Done
            </div>

            <div className="table-actions">
              <FaTrash
                onClick={() => handleDelete(r.id)}
                title="Delete"
                className="delete-icon"
              />
            </div>

          </div>

        ))}

      </div>

      {/* Modal */}
      {showForm && (
        <ReceiptForm
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}