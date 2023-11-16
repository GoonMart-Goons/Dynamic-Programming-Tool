import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from '../Landing';
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; // Import the library itself 

// test('renders Landing component', () => {
//   render(
//     <MemoryRouter>
//       <Landing />
//     </MemoryRouter>
//   );

//   const landingElement = screen.getByTestId('landing-component');
//   expect(landingElement).toBeInTheDocument();
// });

test("renders Logo", () => {
    const {getByAltText} = render(
      <MemoryRouter>
        <Landing /> 
      </MemoryRouter>
    );
  
    const logo = getByAltText("logo");

    expect(logo).toBeInTheDocument();

});

test("renders background", () => {
    const {getByAltText} = render(
      <MemoryRouter>
        <Landing /> 
      </MemoryRouter>
    );
  
    const background = getByAltText("Background GIF");

    expect(background).toBeInTheDocument();

});

test('renders login link', () => {
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );

  const loginLink = screen.getByText('LOGIN');
  expect(loginLink).toBeInTheDocument();
});

test('renders register link', () => {
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );

  const registerLink = screen.getByText('| REGISTER');
  expect(registerLink).toBeInTheDocument();
});
