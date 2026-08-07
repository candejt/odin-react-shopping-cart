import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          BlueBlue Store
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart" className={styles.cartLink}>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
