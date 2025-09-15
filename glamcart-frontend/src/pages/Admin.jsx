import { useState, useEffect } from "react";
import "../styles/Admin.css";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleAdd = async (e) => {
    e.preventDefault();
    const productData = { ...form, price: Number(form.price) };

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    resetForm();
    fetchProducts();
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    const productData = { ...form, price: Number(form.price) };

    await fetch(`http://localhost:5000/api/products/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    resetForm();
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", price: "", image: "", category: "", description: "" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1> Admin Panel </h1>

      <form
        onSubmit={editingId ? handleUpdate : handleAdd}
        style={{
          display: "grid",
          gap: 10,
          maxWidth: 400,
          background: "#f9f9f9",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? "✅ Update Product" : "➕ Add Product"}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} style={{ background: "gray" }}>
            ❌ Cancel Edit
          </button>
        )}
      </form>

 
      <h2 style={{ marginTop: 30 }}> Current Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {products.map((p) => (
            <li
              key={p._id}
              style={{
                marginBottom: 15,
                padding: 10,
                border: "1px solid #ddd",
                borderRadius: 6,
              }}
            >
              <strong>{p.name}</strong> - ₹{p.price}
              <div style={{ marginTop: 5 }}>
                <button
                  onClick={() => {
                    setEditingId(p._id);
                    setForm({
                      name: p.name,
                      price: p.price,
                      image: p.image,
                      category: p.category,
                      description: p.description,
                    });
                  }}
                  style={{ marginRight: 10 }}
                >
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(p._id)}>❌ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
