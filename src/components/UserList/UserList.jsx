import React, { useState, useEffect } from 'react';
import candidates from '../../data/candidates';
import './UserList.css';

// Component to display the list of users and handle voting
const UserList = ({ onVote }) => {
  // State to manage the selected office, office candidates, and the active button
  const [selectedOffice, setSelectedOffice] = useState('');
  const [officeCandidates, setOfficeCandidates] = useState([]);
  const [activeButton, setActiveButton] = useState('');

  // Effect to update officeCandidates when the selectedOffice changes
  useEffect(() => {
    if (selectedOffice) {
      // Filter candidates based on the selected office
      const selectedCandidates = candidates.filter(candidate => candidate.office.toLowerCase() === selectedOffice.toLowerCase());
      setOfficeCandidates(selectedCandidates);
    }
  }, [selectedOffice]);

  // Function to handle the user's vote
  const handleVote = userId => {
    onVote(userId, selectedOffice);
  };

  // Render the UserList component
  return (
    <div>
      {/* Display the voting list title */}
      <h2>Voting List</h2>
      {/* Buttons to select the voting office */}
      <div className="office-buttons">
        {['President', 'Vice President', 'Treasurer', 'Secretary'].map(office => (
          <button
            key={office}
            // Set the selected office and active button when clicked
            onClick={() => {
              setSelectedOffice(office);
              setActiveButton(office);
            }}
            // Apply 'active' class to the active button
            className={activeButton === office ? 'active' : ''}
          >
            {office}
          </button>
        ))}
      </div>
      {/* Display the user list for the selected office */}
      {selectedOffice && officeCandidates.length > 0 && (
        <div className="user-list__container">
          {/* Display the selected office's candidates */}
          <h3 className="user-list__title">{selectedOffice} Candidates</h3>
          {/* Table to present candidate details and voting actions */}
          <table className="user-list__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the officeCandidates array to display each candidate */}
              {officeCandidates.map(candidate => (
                <tr key={candidate.id}>
                  {/* Display candidate details */}
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  {/* Vote button with a unique test ID */}
                  <td>
                    <button data-testid={`vote-button-${candidate.id}`} onClick={() => handleVote(candidate.id)}>
                      Vote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
