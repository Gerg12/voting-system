// src/components/UserList/UserList.js
import React, { useState, useEffect } from 'react';
import candidates from '../../data/candidates'; // Adjust the path based on your project structure

const UserList = ({ onVote }) => {
  const [selectedOffice, setSelectedOffice] = useState('');
  const [officeCandidates, setOfficeCandidates] = useState([]);

  useEffect(() => {
    if (selectedOffice) {
      // Group candidates by office
      const candidatesByOffice = candidates.reduce((acc, candidate) => {
        const office = candidate.office.toLowerCase();
        acc[office] = acc[office] || [];
        acc[office].push(candidate);
        return acc;
      }, {});

      // Select candidates for the chosen office
      const selectedCandidates = candidatesByOffice[selectedOffice.toLowerCase()] || [];
      setOfficeCandidates(selectedCandidates);
    }
  }, [selectedOffice]);

  const handleVote = userId => {
    onVote(userId, selectedOffice);
  };

  return (
    <div>
      <h2>User List Example</h2>
      <label htmlFor="officeSelect">Select Office:</label>
      <select
        id="officeSelect"
        value={selectedOffice}
        onChange={e => setSelectedOffice(e.target.value)}
      >
        <option value="">Select an Office</option>
        <option value="President">President</option>
        <option value="Vice President">Vice President</option>
        <option value="Treasurer">Treasurer</option>
        <option value="Secretary">Secretary</option>
      </select>
      {selectedOffice && officeCandidates.length > 0 && (
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
                  <button onClick={() => handleVote(candidate.id)}>Vote</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
