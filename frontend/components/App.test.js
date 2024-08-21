import React from "react";
import { render, screen } from "@testing-library/react";
import AppFunctional from "./AppFunctional";
import userEvent from "@testing-library/user-event";

test("renders headings correctly", () => {
  render(<AppFunctional />);

  expect(screen.getByText(/Coordinates/i)).toBeInTheDocument();
  expect(screen.getByText(/You moved/i)).toBeInTheDocument();
  expect(screen.getByText(/reset/i)).toBeInTheDocument();
});

test("renders directional buttons", () => {
  render(<AppFunctional />);

  expect(screen.getByText(/LEFT/i)).toBeInTheDocument();
  expect(screen.getByText(/UP/i)).toBeInTheDocument();
  expect(screen.getByText(/RIGHT/i)).toBeInTheDocument();
  expect(screen.getByText(/DOWN/i)).toBeInTheDocument();
});

test("input value updates on typing", () => {
  render(<AppFunctional />);

  const input = screen.getByPlaceholderText(/type email/i);
  userEvent.type(input, "test@example.com");

  expect(input.value).toBe("test@example.com");
});
test("reset button works correctly", () => {
  render(<AppFunctional />);

  const upButton = screen.getByText(/UP/i);
  userEvent.click(upButton);

  const resetButton = screen.getByText(/reset/i);
  userEvent.click(resetButton);

  expect(screen.getByText(/You moved 0 times/i)).toBeInTheDocument();
  expect(screen.getByText(/Coordinates \(2, 2\)/i)).toBeInTheDocument();
});
test("shows error message for invalid email", async () => {
  render(<AppFunctional />);

  const input = screen.getByPlaceholderText(/type email/i);
  const submitButton = screen.findByText(/submit/i);

  userEvent.type(input, "invalid-email");
  userEvent.click(submitButton);

  expect(
    await screen.findByText(/Ouch: email must be a valid email/i)
  ).toBeInTheDocument();
});
