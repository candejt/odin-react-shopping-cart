import { useState, useEffect } from "react";
import styles from "./Shop.module.css";
import ProductCard from "../components/ProductCard";

export default function Shop({ addToCart, product = [] }) {
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
    setQuantities((prev) => ({
      ...prev,
      [productId]: value === "" ? "" : Math.max(1, parseInt(value, 10) || 1),
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

  const handleQuantityBlur = (productId) => {
    if (!quantities[productId] || quantities[productId] === "") {
      setQuantities((prev) => ({ ...prev, [productId]: 1 }));
    }
  };

  return (
    <main className={styles.shopContainer}>
      <h2>Our Products</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id]}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleResetQuantity}
            onQuantityChange={handleQuantityChange}
            onQuantityBlur={handleQuantityBlur}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </main>
  );
}
