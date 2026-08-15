import styles from "./ProductCard.module.css";

export default function ProductCard({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onReset,
  onQuantityChange,
  onQuantityBlur,
  onAddToCart,
}) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>${product.price.toFixed(2)}</p>

      <div className={styles.quantityControls}>
        <button
          type="button"
          onClick={() => onDecrement(product.id)}
          aria-label="Decrease quantity"
        >
          -
        </button>

        <input
          type="number"
          min="1"
          value={quantity ?? 1}
          onChange={(e) => onQuantityChange(product.id, e.target.value)}
          onBlur={() => onQuantityBlur(product.id)}
          className={styles.quantityInput}
        />

        <button
          type="button"
          onClick={() => onIncrement(product.id)}
          aria-label="Increase quantity"
        >
          +
        </button>

        <button
          type="button"
          onClick={() => onReset(product.id)}
          aria-label="Reset quantity"
        >
          🗑️
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => onAddToCart(product, Number(quantity) || 1)}
          className={styles.addToCartBtn}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
