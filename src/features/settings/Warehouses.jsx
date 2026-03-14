import { useState, useEffect } from "react";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";
import {
  getWarehouses,
  storeWarehouse,
  updateWarehouse,
  deleteWarehouse
} from "../../services/warehouseService";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./Warehouses.css";

export default function Warehouses() {

  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    is_active: true
  });

  const [warehouses, setWarehouses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {

    try {

      const response = await getWarehouses();

      if (response.status) {
        setWarehouses(response.data);
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await updateWarehouse(editingId, form);
        alert("Updated successfully");

      } else {

        await storeWarehouse(form);
        alert("Added successfully");

      }

      setForm({
        name: "",
        location: "",
        phone: "",
        is_active: true
      });

      setEditingId(null);
      fetchWarehouses();

    } catch (error) {
      alert(error.message);
    }

  };

  const handleEdit = (warehouse) => {

    setForm({
      name: warehouse.name,
      location: warehouse.location,
      phone: warehouse.phone,
      is_active: warehouse.is_active
    });

    setEditingId(warehouse.id);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this warehouse?")) return;

    try {

      await deleteWarehouse(id);
      fetchWarehouses();

    } catch (error) {
      alert(error.message);
    }

  };

  return (

    <div className="warehouse-page">

      <h2>Warehouse Settings</h2>

      {/* Form */}

      <form className="warehouse-form" onSubmit={handleSubmit}>

        <AppTextField
          label="Warehouse Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          required
        />

        <AppTextField
          label="Location"
          value={form.location}
          onChange={(e)=>setForm({...form,location:e.target.value})}
        />

        <AppTextField
          label="Phone"
          value={form.phone}
          onChange={(e)=>setForm({...form,phone:e.target.value})}
        />

        <AppButton
          text={editingId ? "Update" : "Add"}
          type="submit"
          width="180px"
        />

      </form>

      {/* Table */}

      <div className="table-container">

        {loading && <p>Loading...</p>}

        <table className="warehouse-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {warehouses.map(w => (

              <tr key={w.id}>

                <td>{w.name}</td>
                <td>{w.location}</td>
                <td>{w.phone}</td>
                <td>
                  {w.is_active ? "Active" : "Inactive"}
                </td>

                <td className="action-icons">

                  <FaEdit
                    className="edit-icon"
                    onClick={()=>handleEdit(w)}
                    title="Edit"
                  />

                  <FaTrash
                    className="delete-icon"
                    onClick={()=>handleDelete(w.id)}
                    title="Delete"
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}