import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-img"
      />

      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price}</p>

      {product.description && (
        <p className="product-desc">{product.description}</p>
      )}

      <button
        onClick={() => addToCart(product)}
        className="add-btn"
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
