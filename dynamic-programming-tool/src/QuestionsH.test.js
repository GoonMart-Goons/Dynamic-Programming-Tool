import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import QuestionsH from './QuestionsH';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthContext } from './Database/Auth.js'; // Adjust the path accordingly

const mockAuthContext = {
    currentUser: {
        uid: "123456789",
        email: "user@example.com",
        displayName: "Mock User",
        // ... other fields
    },
    userData: {
        uid: "123456789",
        fullName: "Mock User",
        preferences: { /* ... */ },
        roles: ["user"],
        // ... other data
    }
};

describe('QuestionsH component', () => {

    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <QuestionsH />
                </AuthContext.Provider>
            </MemoryRouter>
        );
    });

    it('renders QuestionsH component correctly', () => {
        render(
            <MemoryRouter>
                <QuestionsH />
            </MemoryRouter>
        );

    });

    it('displays the question initially', () => {
        const { getByText } = render(<QuestionsH />);
        const questionText = getByText(/Question:/i);
        expect(questionText).toBeInTheDocument();
    });

    it('displays the details container when "DETAILS" button is clicked', () => {
        const { getByText, getByTestId } = render(<QuestionsH />);
        const detailsButton = getByText('DETAILS');
        fireEvent.click(detailsButton);
        const detailsContainer = getByTestId('details-container');
        expect(detailsContainer).toBeInTheDocument();
    });

    it('displays the question container when "QUESTION" button is clicked', () => {
        const { getByText, getByTestId } = render(<QuestionsH />);
        const detailsButton = getByText('DETAILS');
        fireEvent.click(detailsButton);

        const questionButton = getByText('QUESTION');
        fireEvent.click(questionButton);

        const questionContainer = getByTestId('question-container');
        expect(questionContainer).toBeInTheDocument();
    });

});
