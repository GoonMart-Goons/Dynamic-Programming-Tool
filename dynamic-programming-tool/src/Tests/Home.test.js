import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter to mock the Router
import Home from '../Home';

test('renders the Home component', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Your test code here
  const titleElement = getByText('Dynamic Programming Bootcamp');
  expect(titleElement).toBeInTheDocument();
});

// test('renders the Heading', () => {
//   const { getByText } = render(<Home />);
  
// });
