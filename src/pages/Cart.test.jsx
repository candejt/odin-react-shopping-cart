import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Cart from "./Cart";
import { userEventApi } from "@testing-library/user-event/dist/cjs/setup/api.js";

const mockCart = [
  {
    id: 1,
    title: "Backpack",
    price: 50,
    quantity: 2,
    image: "backpack.jpg",
  },
];

describe("Cart Component", () => {
  it("shows empty cart message if there is no products", () => {
    render(<Cart cart={[]} />);
    expect(
      screen.getByText(/your cart is currently empty/i),
    ).toBeInTheDocument();
  });

  it("renders correctly cart products and total", () => {
    render(<Cart cart={mockCart} />);
    expect(screen.getByText("Backpack")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Total: $100.00")).toBeInTheDocument();
  });

  it("calls updateQuantity when clicked on + or -", async () => {
    const handleUpdateQuantity = vi.fn();
    const user = userEvent.setup();

    render(<Cart cart={mockCart} updateQuantity={handleUpdateQuantity} />);

    const increaseBtn = screen.getByRole("button", {
      name: "Increase quantity",
    });
    await user.click(increaseBtn);

    expect(handleUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("calls removeFromCart when clicked on delete button", async () => {
    const handleRemoveFromCart = vi.fn();
    const user = userEvent.setup();

    render(<Cart cart={mockCart} removeFromCart={handleRemoveFromCart} />);

    const deleteBtn = screen.getByRole("button", { name: /remove backpack/i });
    await user.click(deleteBtn);

    expect(handleRemoveFromCart).toHaveBeenCalledWith(1);
  });
});
