import { useState } from "react";
import { useEffect } from "react";
import { apiRequest } from "../../services/api";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";
import AppDropdown from "../../components/AppDropdown";
import { storeProduct, updateProduct } from "../../services/productService";

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

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState([]);

  // ✅ Fetch categories from API
  useEffect(() => {

    const fetchData = async () => {

      try {

        // ✅ Fetch Categories
        const categoryResponse = await apiRequest(
          "master-category/list",
          "GET"
        );

        if (categoryResponse.status) {

          const formattedCategories = categoryResponse.data.map((cat) => ({
            label: cat.display_name,
            value: cat.id,
          }));

          setCategories(formattedCategories);

        }

        // ✅ Fetch Units
        const unitResponse = await apiRequest(
          "master-unit/list",
          "GET"
        );

        if (unitResponse.status) {

          const formattedUnits = unitResponse.data.map((unit) => ({
            label: unit.display_name,
            value: unit.id,
          }));

          setUnits(formattedUnits);

        }

      } catch (error) {

        alert(error.message);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        name: form.name,
        sku: form.sku,
        category_id: form.category,
        unit_id: form.unit,
        stock_qty: form.stock ? Number(form.stock) : 0,
      };

      if (product) {

        const updatePayload = {
          name: form.name,
          sku: form.sku,
          category_id: Number(form.category),
          unit_id: Number(form.unit),
          stock_qty: Number(form.stock),
        };

        await updateProduct(product.id, updatePayload);

        alert("Product updated successfully");

      } else {

        // ✅ CREATE
        const response = await storeProduct(payload);

        alert(response.message || "Product created successfully");

      }

      onSave(); // refresh list

    } catch (error) {

      alert(error.message);

    }

  };

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

          {/* ✅ Dynamic Categories */}
          <AppDropdown
            label="Category"
            options={categories}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            disabled={loading}
          />

          <AppTextField
            label="Stock Quantity"
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
          />

          <AppDropdown
            label="Unit of Measure"
            options={units}
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
            disabled={loading}
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