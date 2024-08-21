import AppFunctional from "./AppFunctional";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Test that the visible texts in headings, buttons, links render on the screen", () => {
  test("all headings, buttons, and links are present", () => {
    render(<AppFunctional />);

    const coordinatesHeading = screen.getByText(/Coordinates \(.*\)/i);
    const stepsHeading = screen.getByText(
      /You moved \d+ times?|You moved \d+ time/i
    );

    const messageElement = screen.getByRole("heading", {
      name: /coordinates/i,
    });

    const leftButton = screen.getByRole("button", { name: /left/i });
    const upButton = screen.getByRole("button", { name: /up/i });
    const rightButton = screen.getByRole("button", { name: /right/i });
    const downButton = screen.getByRole("button", { name: /down/i });
    const resetButton = screen.getByRole("button", { name: /reset/i });

    const emailInput = screen.getByPlaceholderText(/type email/i);

    expect(coordinatesHeading).toBeInTheDocument();
    expect(stepsHeading).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();

    expect(leftButton).toBeInTheDocument();
    expect(upButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();

    expect(emailInput).toBeInTheDocument();
  });
});
