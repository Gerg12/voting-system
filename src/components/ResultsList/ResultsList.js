import React from 'react';

const ResultsList = ({ office, userVotes, candidates }) => {
  const getUserVotesByOffice = () => {
    return Object.keys(userVotes)
      .filter((userId) => userVotes[userId]?.[office])
      .sort((a, b) => userVotes[b][office] - userVotes[a][office]);
  };

  return (
    <div className="result-list" key={office}>
      <h3>{office} Results</h3>
      <table>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>ID</th>
            <th style={{ width: '150px' }}>Name</th>
            <th style={{ width: '200px' }}>Email</th>
            <th style={{ width: '100px' }}>{office} Votes</th>
          </tr>
        </thead>
        <tbody>
          {getUserVotesByOffice().map((userId) => (
            <tr key={userId}>
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
