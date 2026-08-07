import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Shop from "./Shop";

const mockProducts = [
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    title: "Mens Casual T-Shirt",
    price: 22.3,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY866._SX._UX._SY._UY_.jpg",
  },
];

describe("Shop component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it("renders loading state initially and then displays products", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
    render(<Shop />);

    await waitFor(() => {
      expect(screen.getByText("Fjallraven Backpack")).toBeInTheDocument();
      expect(screen.getByText("Mens Casual T-Shirt")).toBeInTheDocument();
    });
    expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument();
  });

  it("renders error message when fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => mockProducts,
    });
    render(<Shop />);

    await waitFor(() => {
      expect(screen.getByText(/error loading products/i)).toBeInTheDocument();
    });
  });
});
