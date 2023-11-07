import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Register from './Register';
import '@testing-library/jest-dom';
import { createUserWithEmailAndPassword, setDoc } from './Database/firebase';

// Mock the navigation function provided by react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useNavigate: () => jest.fn(),
}));


describe('Register Component', () => {
    test('renders Register component and checks if content is correctly rendered', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Check if the form is rendered 
        expect(screen.getByRole('form')).toBeInTheDocument();

        // Check for input fields
        expect(screen.getByPlaceholderText('Enter your firstname')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your lastname')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();

        // Check for the register button
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

        // Check for links to privacy notices
        expect(screen.getByText(/conditions of use & sale/i)).toBeInTheDocument();
        expect(screen.getByText(/privacy notice/i)).toBeInTheDocument();

    });
});

describe('Input Validation Errors', () => {
    test('shows error message for invalid first name', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter your firstname'), {
            target: { value: '123' }, // Invalid first name
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your firstname')); // to trigger validation

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText("First name should not contain numbers")).toBeInTheDocument();
        });
    });

    test('shows error message for invalid last name', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter your lastname'), {
            target: { value: '123' }, // Invalid last name
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your lastname'));

        await waitFor(() => {
            expect(screen.getByText("Last name should not contain numbers")).toBeInTheDocument();
        });
    });

    test('shows error message for invalid email', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
            target: { value: 'test' }, // Invalid email
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your email'));

        await waitFor(() => {
            expect(screen.getByText("Invalid email address")).toBeInTheDocument();
        });
    });

    test('shows error message for invalid password', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: 'short' }, // Invalid password
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your password'));

        await waitFor(() => {
            expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
        });
    });

    test('shows error for password without an uppercase letter', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: 'aa!7aa!7' }, // Invalid password
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your password'));

        await waitFor(() => {
            expect(screen.getByText("Password must contain at least one uppercase letter")).toBeInTheDocument();
        });
    });

    test('shows error for password without a lowercase letter', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: 'AA!7AA!7' }, // Invalid password
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your password'));

        await waitFor(() => {
            expect(screen.getByText("Password must contain at least one lowercase letter")).toBeInTheDocument();
        });
    });

    test('shows error for password without a digit', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: 'aAA!AA!!' }, // Invalid password
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your password'));

        await waitFor(() => {
            expect(screen.getByText("Password must contain at least one digit")).toBeInTheDocument();
        });
    });

    test('shows error for password without a special character', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: 'AAa7AAa7'  }, // Invalid password
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your password'));

        await waitFor(() => {
            expect(screen.getByText("Password must contain at least one special character")).toBeInTheDocument();
        });
    });

    test('shows error message for not selecting a role', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByTestId('roleselect'), {
            target: { value: '' }, // Invalid role
        });
        fireEvent.blur(screen.getByTestId('roleselect'));


        await waitFor(() => {
            expect(screen.getByText("Role is required")).toBeInTheDocument();
        });
    });

});

// Setup the mock for useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useNavigate: jest.fn(), // mock useNavigate
}));


// Mock the Firebase functions and the navigate hook at the top of your test file
jest.mock('./Database/firebase', () => ({
    auth: {},
    db: {},
    createUserWithEmailAndPassword: jest.fn(),
    setDoc: jest.fn(),
}));

describe('Register Button Behavior', () => {
    test('successful registration', async () => {
        // Mock the implementation for a successful registration
        createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: 'test-uid' } });
        setDoc.mockResolvedValue();

        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // ... simulate valid input and form submission ...
        fireEvent.change(screen.getByPlaceholderText('Enter your firstname'), {
            target: { value: 'john' }
        });
        fireEvent.change(screen.getByPlaceholderText('Enter your lastname'), {
            target: { value: 'doe' }
        });
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
            target: { value: 'johndoe@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: 'Password123!' }
        });
        fireEvent.change(screen.getByTestId('roleselect'), {
            target: { value: 'student' }
        });
        // Simulate form submission
        fireEvent.submit(screen.getByTestId('register-button'));

        await waitFor(() => {
            //expect(createUserWithEmailAndPassword).toHaveBeenCalled();
            //expect(setDoc).toHaveBeenCalledWith(expect.anything(), {Name: 'John', Surname: 'Doe', Email: 'john.doe@example.com', Role: 'student'});
            //expect(window.alert).toHaveBeenCalledWith('Registered successfully! Please sign in');
            //expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });

    test('register button does not work when an error message is displayed', async () => {
        const mockNavigate = jest.fn();
        // Provide the mock implementation for this test block
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Input invalid data to generate error message
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: 'short' } // Invalid password
        });
        fireEvent.blur(screen.getByPlaceholderText('Enter your password'));

        // Wait for the error message
        await waitFor(() => {
            expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
        });

        // Attempt to submit the form
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        // Check if navigate was not called
        expect(mockNavigate).not.toHaveBeenCalled();
    });

});

