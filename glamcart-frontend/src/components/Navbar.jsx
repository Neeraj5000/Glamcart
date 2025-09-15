import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar({ setOpen }) {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      {/* Left side logo */}
      <div className="nav-left">
        <Link to="/" className="logo">GlamCart</Link>
      </div>

      {/* Right side links */}
      <div className="nav-right">
        {/* Home button */}
        <Link to="/" className="nav-link">🏠 Home</Link>

        {/* Admin button */}
        <Link to="/admin" className="nav-link">⚙️ Admin</Link>

        {/* Cart button */}
        <button className="cart-btn" onClick={() => setOpen(true)}>
          🛒 Cart <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}
