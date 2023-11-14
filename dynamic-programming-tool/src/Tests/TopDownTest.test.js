import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import TopDownTest from '../TopDownTest';
import '@testing-library/jest-dom';


describe('TopDownTest Component', () => {
    test('renders Register component and checks if content is correctly rendered', () => {
        render(
            <MemoryRouter>
                <TopDownTest />
            </MemoryRouter>
        );

        const navBar = screen.getByTestId('nav-bar');
        expect(navBar).toBeInTheDocument();

    });
});
