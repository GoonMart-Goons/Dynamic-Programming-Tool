import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";

test("Clicking Introduction button navigates to Introduction route", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/home"]}>
      <Home />
    </MemoryRouter>
  );

  const introductionButton = getByText("Introduction");
  act(() => {
    fireEvent.click(introductionButton);
  });

  expect(window.location.pathname).toBe("/introduction");
});

// Similarly, write tests for other buttons and navigation.
