import React from 'react';
import { render, fireEvent, getByText, getByTestId } from '@testing-library/react'; // Importing the missing functions
import UserList from './UserList';

describe('UserList Component', () => {
  it('handles votes correctly', () => {
    const mockOnVote = jest.fn();
    const { getByText, getByTestId } = render(<UserList onVote={mockOnVote} />);

    // Select an office
    fireEvent.click(getByText('President'));

    // Simulate a vote using getByTestId
    const voteButton = getByTestId('vote-button-1'); // Replace '1' with the appropriate candidate ID
    fireEvent.click(voteButton);

    // Check if the onVote function is called with the correct parameters
    expect(mockOnVote).toHaveBeenCalledWith(expect.any(Number), 'President');
  });
});
