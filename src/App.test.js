import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Voting Site header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Voting Site/i);
  expect(headerElement).toBeInTheDocument();
});
