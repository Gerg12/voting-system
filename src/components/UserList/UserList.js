import React, { useState, useEffect } from 'react';
import candidates from '../../data/candidates';
import './UserList.css';

const UserList = ({ onVote }) => {
  const [selectedOffice, setSelectedOffice] = useState('');
  const [officeCandidates, setOfficeCandidates] = useState([]);
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    if (selectedOffice) {
      const selectedCandidates = candidates.filter(candidate => candidate.office.toLowerCase() === selectedOffice.toLowerCase());
      setOfficeCandidates(selectedCandidates);
    }
  }, [selectedOffice]);

  const handleVote = userId => {
    onVote(userId, selectedOffice);
  };

  return (
    <div>
      <h2>Voting List</h2>
      <div className="office-buttons">
        {['President', 'Vice President', 'Treasurer', 'Secretary'].map(office => (
          <button
            key={office}
            onClick={() => {
              setSelectedOffice(office);
              setActiveButton(office);
            }}
            className={activeButton === office ? 'active' : ''}
          >
            {office}
          </button>
        ))}
      </div>
      {selectedOffice && officeCandidates.length > 0 && (
        <div className="user-list__container">
          <h3 className="user-list__title">{selectedOffice} Candidates</h3>
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
              {officeCandidates.map(candidate => (
                <tr key={candidate.id}>
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>
                    {/* Add a test ID to the Vote button */}
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
