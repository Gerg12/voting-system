// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  // Replace the text or query based on your actual App component
  const appElement = screen.getByText(/Voting Site/i);
  expect(appElement).toBeInTheDocument();
});
