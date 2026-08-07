import { describe, it, expect, Experimental } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Component", () => {
  it("renders home page title", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Home Page",
    );
  });
});
