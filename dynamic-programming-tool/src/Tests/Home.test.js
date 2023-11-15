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

test("Displays user's name and email", () => {
  const user = {
    Name: "John",
    Surname: "Doe",
    Email: "john.doe@example.com",
  };

  const { getByText } = render(
    <MemoryRouter>
      <Home />,
    </MemoryRouter>
  );

  const nameElement = getByText(`${user.Name} ${user.Surname}`);
  const emailElement = getByText(user.Email);

  expect(nameElement).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
});

test("Displays badges fetched from the API", async () => {
  const badges = ["Badge 1", "Badge 2"];
  getBadges.mockResolvedValue(badges);

  const { getByText } = render(
    <MemoryRouter>
      <Home />,
    </MemoryRouter>
  );

  await act(async () => {
    // Wait for badge data to be loaded
  });

  badges.forEach((badge) => {
    const badgeElement = getByText(badge);
    expect(badgeElement).toBeInTheDocument();
  });
});

