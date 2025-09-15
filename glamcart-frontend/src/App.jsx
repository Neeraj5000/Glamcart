
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Admin from "./pages/Admin";
import CartDrawer from "./components/CartDrawer";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { useCart } from "./context/CartContext";

// Styles
import "./styles/App.css";
import "./styles/Cart.css";
import "./styles/Home.css";
import "./styles/theme.css";


function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      
      <Hero />

      <section className="section">
        <h2 className="section-title"> Featured Products</h2>


        {error && <div className="slab">{error}</div>}


        {loading ? (
          <div className="products-grid">
            {[...Array(6)].map((_, i) => (
              <div className="slab" key={i}>
                <div className="skeleton" />
                <div style={{ height: 12 }} />
                <div className="skeleton" style={{ height: 14 }} />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="slab">No products yet. Check back soon!</div>
        ) : (
          <div className="products-grid">
            {products.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart(); 

  return (
    <Router>

      <Navbar setOpen={setOpen} cartCount={cartCount} />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />

        <Route
          path="*"
          element={
            <div className="page">
              <div className="slab">Page not found</div>
            </div>
          }
        />
      </Routes>

      <CartDrawer open={open} setOpen={setOpen} />

      <Footer />
    </Router>
  );
}
