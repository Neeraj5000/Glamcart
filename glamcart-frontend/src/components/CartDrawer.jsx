import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

export default function CartDrawer({ open, setOpen }) {
  const { cart, cartTotal, increment, decrement, removeFromCart, clearCart } = useCart();

  return (
    <div className={`cart-drawer ${open ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Cart 🛒</h2>
        <button onClick={() => setOpen(false)}>✖</button>
      </div>

      {cart.length === 0 ? (
        <p>No items yet. Add something</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <div>₹{item.price}</div>
                </div>

                <div className="cart-controls">
                  <button onClick={() => decrement(item._id)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increment(item._id)}>+</button>
                </div>

                <div>₹{item.price * item.quantity}</div>

                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  ❌
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <strong>Total: ₹{cartTotal}</strong>
            <button onClick={clearCart} className="clear-btn">Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}
