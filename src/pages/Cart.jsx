import styles from "./Cart.module.css";

export default function Cart({ cart = [], updateQuantity, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className={styles.cartMessage}>
        <h1>Your Cart</h1>
        <p>... Your cart is currently empty ...</p>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h2>Your Cart</h2>

      <div className={styles.cartContainerList}>
        <ul className={styles.itemList}>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.itemImage}
              />

              <div className={styles.itemDetails}>
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>

              <div className={styles.quantityControls}>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className={styles.subtotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className={styles.deleteBtn}
                aria-label={`remove ${item.title}`}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>

         <div className={styles.summary}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button type="button" className={styles.checkoutBtn}>
          Checkout
        </button>
      </div>
      </div>

     
    </div>
  );
}
