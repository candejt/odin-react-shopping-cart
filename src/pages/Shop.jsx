import { useState, useEffect } from "react";
import styles from "./Shop.module.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className={styles.status}>Loading products...</p>;
  if (error)
    return <p className={styles.status}>Error loading products: {error}</p>;

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
            <button className={styles.button}>Add to Cart</button>
          </article>
        ))}
      </div>
    </main>
  );
}
