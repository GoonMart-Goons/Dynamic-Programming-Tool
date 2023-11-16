import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WrittenAnswer from '../Components/writtenAnswer';

describe('WrittenAnswer component', () => {
  it('renders with the correct question number', () => {
    const { container } = render(<WrittenAnswer questionNumber={1} />);
    
    // Adjust this expectation based on your actual rendering
    expect(container.querySelector('h4').textContent).toBe('Question B');
  });

  

  // Add more test cases as needed
});
