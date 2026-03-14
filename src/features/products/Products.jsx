
import { useState } from "react";
import AppButton from "../../components/AppButton";
import ProductForm from "./ProductForm";
import "./Products.css";

export default function Products() {

  const [products, setProducts] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const handleSave = (product) => {

    if (editingProduct) {

      setProducts(
        products.map((p) =>
          p.id === product.id ? product : p
        )
      );

    } else {

      setProducts([
        ...products,
        { ...product, id: Date.now() }
      ]);

    }

    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {

    setEditingProduct(product);
    setShowForm(true);

  };

  const handleDelete = (id) => {

    const updated = products.filter((p) => p.id !== id);

    setProducts(updated);

  };

  return (
    <div className="products-page">

      <div className="products-header">

        <h2>Products</h2>

        <AppButton
          text="Add Product"
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
          }}
          width="150px"
        />

      </div>

      {/* Table */}

      <div className="product-table">

        <div className="table-header">
          <div>Name</div>
          <div>SKU</div>
          <div>Category</div>
          <div>Stock</div>
          <div>Action</div>
        </div>

        {products.length === 0 && (
          <div className="empty-row">
            No products added
          </div>
        )}

        {products.map((product) => (

          <div key={product.id} className="table-row">

            <div>{product.name}</div>
            <div>{product.sku}</div>
            <div>{product.category}</div>
            <div>{product.stock}</div>

            <div className="table-actions">

              <AppButton
                text="Edit"
                width="70px"
                height="35px"
                backgroundColor="#2563eb"
                onClick={() => handleEdit(product)}
              />

              <AppButton
                text="Delete"
                width="80px"
                height="35px"
                backgroundColor="#dc2626"
                hoverColor="#b91c1c"
                onClick={() => handleDelete(product.id)}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Form Modal */}

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