import {
  getAllByRole,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "./App";

const mockProducts = [
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
];

describe("App integration tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders Home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("adds items to cart from Shop page and updates cart count in navbar", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
    render(
      <MemoryRouter initialEntries={["/shop"]}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Fjallraven Backpack")).toBeInTheDocument();
    });

    const quantityInput = screen.getAllByRole("spinbutton");
    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });

    fireEvent.change(quantityInput[0], { target: { value: "2" } });
    await user.click(addButtons[0]);

    expect(screen.getByText(/Cart \(2\)/i)).toBeInTheDocument();
  });
});
