import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const numQuantity = Number(quantity);
    if (isNaN(numQuantity) || numQuantity <= 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + numQuantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: numQuantity }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const numQuantity = Number(newQuantity);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: numQuantity } : item,
      ),
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalItemsCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div>
      <Navbar itemCount={totalItemsCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="*" element={<h1>404 - Page not found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
