import { useState, useEffect } from "react";
import styles from "./Shop.module.css";

export default function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error status" + res.status);
        }
        return res.json();
      })

      .then((data) => {
        setProducts(data);

        const initialQuantities = {};
        data.forEach((product) => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);

        setLoading(false);
      })

      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (productId, value) => {
    const num = Math.max(1, Number(value));
    setQuantities((prev) => ({
      ...prev,
      [productId]: num,
    }));
  };

  if (loading) return <p className={styles.status}>Loading products...</p>;
  if (error)
    return <p className={styles.status}>Error loading products: {error}</p>;

  const handleDecrement = (productId) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId] ?? 1;
      return { ...prev, [productId]: Math.max(1, currentQuantity - 1) };
    });
  };
  const handleIncrement = (productId) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId] ?? 1;
      return { ...prev, [productId]: currentQuantity + 1 };
    });
  };
  const handleResetQuantity = (productId) => {
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));
  };

  return (
    <main className={styles.container}>
      <h1>Our Products</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.price}>${product.price}</p>

            <div className={styles.quantityContainer}>
              <button
                type="button"
                onClick={() => handleDecrement(product.id)}
                className={styles.qtyBtn}
                aria-label="Decrease quantity"
              >
                -
              </button>

              <input
                type="number"
                min="1"
                value={quantities[product.id] ?? 1}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuantities((prev) => ({
                    ...prev,
                    [product.id]:
                      val === "" ? "" : Math.max(1, parseInt(val, 10) || 1),
                  }));
                }}
                onBlur={() => {
                  if (
                    !quantities[product.id] ||
                    quantities[product.id] === ""
                  ) {
                    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
                  }
                }}
                className={styles.qtyInput}
              />
              <button
                type="button"
                onClick={() => handleIncrement(product.id)}
                className={styles.qtyBtn}
                aria-label="Increase quantity"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => handleResetQuantity(product.id)}
                className={styles.deleteBtn}
                aria-label="Reset quantity"
                title="Reset quantity to 1"
              >
                🗑️
              </button>
            </div>
            <div>
              <button
                className={styles.button}
                onClick={() =>
                  addToCart(product, Number(quantities[product.id] || 1))
                }
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
