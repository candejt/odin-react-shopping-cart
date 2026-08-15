import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "./ProductCard";
import userEvent from "@testing-library/user-event";

const mockProducts = {
  id: 1,
  title: "Backpack",
  price: 50,
  image: "backpack.jpg",
};

describe("Product Card Component", () => {
  it("renders information correctly", () => {
    render(<ProductCard product={mockProducts} quantity={1} />);

    expect(screen.getByText("Backpack")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  it("calls onAddToCart with the product and quantity", async () => {
    const handleAddToCart = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductCard
        product={mockProducts}
        quantity={2}
        onAddToCart={handleAddToCart}
      />,
    );

    const addBtn = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addBtn);

    expect(handleAddToCart).toHaveBeenCalledWith(mockProducts, 2);
  });
});
