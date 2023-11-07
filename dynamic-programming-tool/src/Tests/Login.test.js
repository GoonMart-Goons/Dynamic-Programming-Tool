import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; // Import the library itself

import Login from "../Login";

test("renders Logo", () => {
    const {getByAltText} = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    const logo = getByAltText("logo");

    expect(logo).toBeInTheDocument();

});

test("renders Labels", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    const emailLabel = getByText("EMAIL");
    const passwordLabel = getByText("PASSWORD");
  
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

test("renders Inputs", () => {
  const { getByPlaceholderText } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = getByPlaceholderText("Enter your email address");
  const passwordInput = getByPlaceholderText("Enter your password");

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("renders Button", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const loginButton = getByText("LOGIN");

    expect(loginButton).toBeInTheDocument();
  });

  test("User can enter text in email and password fields", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    const emailInput = getByPlaceholderText("Enter your email address");
    const passwordInput = getByPlaceholderText("Enter your password");
  
    act(() => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
    });
  
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
