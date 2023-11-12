import React from 'react';

// Component to display voting results for a specific office
const ResultsList = ({ office, userVotes, candidates }) => {
  // Function to retrieve and sort user votes for the current office
  const getUserVotesByOffice = () => {
    return Object.keys(userVotes)
      .filter((userId) => userVotes[userId]?.[office])
      .sort((a, b) => userVotes[b][office] - userVotes[a][office]);
  };

  // Render the ResultsList component
  return (
    <div className="result-list">
      {/* Display the office name */}
      <h3>{office} Results</h3>
      {/* Table to present the voting results */}
      <table>
        <thead>
          <tr>
            {/* Table headers */}
            <th style={{ width: '50px' }}>ID</th>
            <th style={{ width: '150px' }}>Name</th>
            <th style={{ width: '200px' }}>Email</th>
            <th style={{ width: '100px' }}>{office} Votes</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the sorted user votes for the current office */}
          {getUserVotesByOffice().map((userId) => (
            <tr key={userId}>
              {/* Display user details and their votes for the office */}
              <td>{userId}</td>
              <td>{candidates.find((candidate) => candidate.id === parseInt(userId, 10)).name}</td>
              <td>{candidates.find((candidate) => candidate.id === parseInt(userId, 10)).email}</td>
              <td>{userVotes[userId]?.[office] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsList;
