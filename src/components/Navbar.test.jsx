import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("renders navigation links in navbar", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument;
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument;
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument;
  });
});
