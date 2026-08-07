import { describe, it, expect, Experimental } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";

describe("Home Page", () => {
  it("renders heading and shop lin", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /welcome/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop now/i })).toBeInTheDocument();
  });
});
