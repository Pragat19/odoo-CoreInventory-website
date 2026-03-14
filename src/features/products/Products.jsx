import { useState, useEffect } from "react";
import AppButton from "../../components/AppButton";
import ProductForm from "./ProductForm";
import "./Products.css";
import { getProducts, deleteProduct } from "../../services/productService";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from API
  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await getProducts();

      if (response.status) {

        setProducts(response.data);

      }

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  const handleSave = () => {

    // Refresh list after save
    fetchProducts();

    setShowForm(false);
    setEditingProduct(null);

  };

  const handleEdit = (product) => {

    setEditingProduct(product);
    setShowForm(true);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {

      const response = await deleteProduct(id);

      alert(response.message || "Product deleted successfully");

      // Refresh list after delete
      fetchProducts();

    } catch (error) {

      alert(error.message);

    }

  };

  return (
    <div className="products-page">

      <div className="products-header">

        <div></div>
        <AppButton
          text="Add Product"
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
          }}
          width="150px"
        />

      </div>

      <div className="product-table">
        <div className="table-header">
          <div>Name</div>
          <div>SKU</div>
          <div>Category</div>
          <div>Unit</div>
          <div>Stock</div>
          <div style={{ textAlign: "center" }}>Action</div>
        </div>

        {loading && (
          <div className="empty-row">
            Loading...
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="empty-row">
            No products found
          </div>
        )}

        {products.map((product) => (

          <div key={product.id} className="table-row">

            <div>{product.name}</div>
            <div>{product.sku}</div>

            {/* ✅ Show display names */}
            <div>
              {product.category?.display_name}
            </div>

            <div>
              {product.unit?.display_name}
            </div>

            <div>{product.stock_qty}</div>

            <div className="table-actions" style={{ justifyContent: "center" }}>

              {/* Edit Icon */}
              <FaEdit
                onClick={() => handleEdit(product)}
                style={{
                  cursor: "pointer",
                  color: "#2563eb",
                  fontSize: "18px",
                }}
                title="Edit"
              />

              <FaTrash
                onClick={() => handleDelete(product.id)}
                style={{
                  cursor: "pointer",
                  color: "#dc2626",
                  fontSize: "18px",
                }}
                title="Delete"
              />

            </div>

          </div>

        ))}

      </div>

      {showForm && (

        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />

      )}

    </div>
  );
}