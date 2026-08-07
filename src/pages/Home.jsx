import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Welcome <br />to <br /> BlueBlue Store</h1>
      <Link to="/shop" className={styles.ctaLink}>Shop Now</Link>
    </main>
  );
}
