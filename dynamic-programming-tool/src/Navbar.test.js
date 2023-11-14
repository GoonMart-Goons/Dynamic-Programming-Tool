import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import { auth } from "./Database/firebase";
import '@testing-library/jest-dom';


// Mock Firebase auth.signOut
jest.mock("./Database/firebase", () => ({
    auth: {
        signOut: jest.fn(),
    },
    app: jest.fn(), // If you are using app in your component
}));

describe('Navbar', () => {
    // Helper function to render the Navbar within a Router context
    const renderNavbarWithRouter = (placeholder) => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <Routes>
                    <Route path="/home" element={<Navbar placeholder={placeholder} />} />
                </Routes>
            </MemoryRouter>
        );
    };

    test('Navbar renders with placeholder text', () => {
        const placeholder = "Test Placeholder";
        renderNavbarWithRouter(placeholder);
        expect(screen.getByText(placeholder)).toBeInTheDocument();
    });

    test('Navbar has a visible brand logo', () => {
        renderNavbarWithRouter("Test Placeholder");
        expect(screen.getByAltText('')).toBeInTheDocument();
    });

    test('Toggle navigation visibility', () => {
        renderNavbarWithRouter("Test Placeholder");
        const toggleButton = screen.getByLabelText('Toggle navigation');
        expect(toggleButton).toBeInTheDocument();

        // Initial state should not show the collapse menu
        //expect(screen.queryByClassName('navbar-collapse')).not.toBeVisible();

        // Click to change visibility
        fireEvent.click(toggleButton);

        // After click, the collapse menu should be visible
        //expect(screen.getByClassName('navbar-collapse')).toBeVisible();
    });

    test('Active navigation link is styled correctly', () => {
        renderNavbarWithRouter("Test Placeholder");

        // Since 'useLocation' will be '/home', the HOME link should be active
        const homeLink = screen.getByText('HOME').closest('a');
        expect(homeLink).toHaveClass('active');
    });

    test('Clicking sign out calls auth.signOut', () => {
        renderNavbarWithRouter("Test Placeholder");
        const signOutButton = screen.getByText('SIGN OUT');
        fireEvent.click(signOutButton);

        // auth.signOut should be called when the sign out button is clicked
        expect(auth.signOut).toHaveBeenCalled();
    });

    // You should add more tests here to check each navigation link works as expected
});
