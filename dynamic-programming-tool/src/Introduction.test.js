import { render, screen } from '@testing-library/react';
import Introduction from './Introduction';
import Navbar from "./Navbar";
import GraphView from "./Components/graph";
import '@testing-library/jest-dom';
import * as reactRouterDom from 'react-router-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Register from "./Register";
import React from "react";
// Mock child components
jest.mock('./Navbar', () => {
    return jest.fn(() => <div>NavbarMock</div>);
});
jest.mock('./Components/graph', () => {
    return jest.fn(() => <div>GraphViewMock</div>);
});
// We'll mock the entire module to mock `Link` as well.
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use actual for all non-hook parts
    useLocation: () => ({
        pathname: '/introduction',
    }),
    Link: ({ children }) => children, // Mock Link as a simple pass-through
}));

// Mock GraphView component
jest.mock('./Components/graph', () => {
    return () => <div>GraphViewMock</div>;
});

describe('Introduction', () => {
    beforeEach(() => {
        // Render Introduction component before each test
        render(
            <reactRouterDom.BrowserRouter>
                <Introduction />
            </reactRouterDom.BrowserRouter>
        );

    });

    test('renders static content', () => {
        expect(screen.getByText('General Theory')).toBeInTheDocument();
        expect(screen.getByText('Top-Down Approach')).toBeInTheDocument();
        expect(screen.getByText('Tutorial')).toBeInTheDocument();
        expect(screen.getByText('Question')).toBeInTheDocument();
        expect(screen.getByText('Answer')).toBeInTheDocument();
    });

    test('renders dynamic content', () => {
        // This regex matches any string that starts with 'Illustrate the tree diagram to find Fibonacci number'
        expect(screen.getByText(/Illustrate the tree diagram to find Fibonacci number/)).toBeInTheDocument();
    });

    test('renders Navbar component', () => {
        expect(Navbar).toHaveBeenCalled();
        expect(screen.getByText('NavbarMock')).toBeInTheDocument(); // This checks the mock component's text
    });

    test('renders GraphView component', () => {
        expect(GraphView).toHaveBeenCalled();
        expect(screen.getByText('GraphViewMock')).toBeInTheDocument(); // This checks the mock component's text
    });

    test('renders a submit button', () => {
        expect(screen.getByText('SUBMIT')).toBeInTheDocument();
    });


});
