import React from "react";
import { render, fireEvent, act, screen, waitFor} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; // Import the library itself 

import Login from "../Login";
import Register from "../Register";

//DISPLAY
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

  //INTERACTION
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

  //ERRORS
  test("User can enter text in email and password fields", async() => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = getByPlaceholderText("Enter your password");

    act(() => {
        fireEvent.change(passwordInput, { target: { value: "test" } });
    });

    fireEvent.blur(passwordInput);


    await waitFor(() => {
        expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
    });
});


test('displays error message for invalid email', async () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
        target: { value: 'invalidemail' }, // Invalid first name
    });
    fireEvent.blur(screen.getByPlaceholderText('Enter your email address')); // to trigger validation

    // Wait for the error message to appear
    await waitFor(() => {
        expect(screen.getByText('Invalid email format.')).toBeInTheDocument();
    });
});

test("submits form with valid data", async () => {

    const { getByPlaceholderText, getByText } = render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Enter your email address"), { target: { value: "test@example.com" } });
    fireEvent.change(getByPlaceholderText("Enter your password"), { target: { value: "password123" } });
    fireEvent.click(getByText("LOGIN"));

    await waitFor(() => {
        //expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password123");
    });
});



test("navigates to dashboard on successful login", async () => {
    const { getByPlaceholderText, getByText } = render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Enter your email address"), { target: { value: "user@example.com" } });
    fireEvent.change(getByPlaceholderText("Enter your password"), { target: { value: "correctpassword" } });
    fireEvent.click(getByText("LOGIN"));

    await waitFor(() => {
        //expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
});
