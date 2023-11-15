import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import '@testing-library/jest-dom';
import dpLogo from '../Images/dp2.png';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('second Navbar component', () => {
    const placeholder = "Dynamic Programming";

    beforeEach(() => {
        render(
            <Router>
                <Navbar placeholder={placeholder} />
            </Router>
        );
    });

    test('renders the navbar with placeholder text', () => {
        expect(screen.getByText(placeholder)).toBeInTheDocument();
    });

    test('renders the brand logo', () => {
        expect(screen.getByAltText('')).toHaveAttribute('src', dpLogo);
    });

    test('toggle navigation visibility', () => {
        const toggleButton = screen.getByLabelText('Toggle navigation');
        fireEvent.click(toggleButton);
        // The visibility of CCollapse is managed internally by CNavbarToggler and CCollapse,
        // so we can check for the visibility attribute change.
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(toggleButton);
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('navigation links are correct', () => {
        const homeLink = screen.getByText('Home').closest('a');
        expect(homeLink).toHaveAttribute('href', '/home');
        const introLink = screen.getByText('Introduction').closest('a');
        expect(introLink).toHaveAttribute('href', '/introduction');
        // Check for dropdown items
        const topDownLink = screen.getByText('Top-down Approach').closest('a');
        expect(topDownLink).toHaveAttribute('href', '/topdown');
        const bottomUpLink = screen.getByText('Bottom-up Approach').closest('a');
        expect(bottomUpLink).toHaveAttribute('href', 'bottomup');
        const finalTestLink = screen.getByText('Final Test').closest('a');
        expect(finalTestLink).toHaveAttribute('href', '#');
    });

    test('sign out button is correct', () => {
        const signOutButton = screen.getByText('Sign Out');
        expect(signOutButton).toHaveAttribute('href', '/');
    });
});

// Custom component to capture and display the current location
function LocationDisplay() {
    let location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
}

describe('Navbar Navigation', () => {
    const placeholder = "Dynamic Programming";

    const assertNavigation = async (linkText, expectedPath) => {
        userEvent.click(screen.getByText(linkText));
        await waitFor(() => {
            expect(screen.getByTestId('location-display').textContent).toBe(expectedPath);
        });
    };

    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="*" element={<><Navbar placeholder={placeholder} /><LocationDisplay /></>} />
                    <Route path="/home" element={<h1>Home Page</h1>} />
                    <Route path="/introduction" element={<h1>Introduction Page</h1>} />
                    <Route path="/topdown" element={<h1>Top-Down Approach Page</h1>} />
                    <Route path="/bottomup" element={<h1>Bottom-Up Approach Page</h1>} />
                    {/* Add other routes here */}
                </Routes>
            </MemoryRouter>
        );
    });

    test('navigate to home page', async () => {
        await assertNavigation('Home', '/home');
    });

    test('navigate to introduction page', async () => {
        await assertNavigation('Introduction', '/introduction');
    });

    test('navigate to top-down approach page', async () => {
        await assertNavigation('Top-down Approach', '/topdown');
    });

    test('navigate to bottom-up approach page', async () => {
        await assertNavigation('Bottom-up Approach', '/bottomup');
    });

    // ... add more tests for other navigation links ...
});
