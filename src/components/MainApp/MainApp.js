import React, { useState } from 'react';
import UserList from '../UserList/UserList';
import './MainApp.css';
import candidates from '../../data/candidates';
const offices = ['President', 'Vice President', 'Treasurer', 'Secretary'];

const MainApp = () => {
  const [userVotes, setUserVotes] = useState({});

  const handleVote = (userId, office) => {
    setUserVotes(prevVotes => ({
      ...prevVotes,
      [userId]: { ...prevVotes[userId], [office]: (prevVotes[userId]?.[office] || 0) + 1 },
    }));
  };

  const getUserVotesByOffice = office => {
    return Object.keys(userVotes)
      .filter(userId => userVotes[userId]?.[office])
      .sort((a, b) => userVotes[a][office] - userVotes[b][office]);
  };

  return (
    <section className="gutter">
      <div className="container">
        <UserList onVote={handleVote} />
        
        <h2>Results</h2>
        {offices.map(office => (
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
                {getUserVotesByOffice(office).map(userId => (
                  <tr key={userId}>
                    <td>{userId}</td>
                    <td>{candidates.find(candidate => candidate.id === parseInt(userId, 10)).name}</td>
                    <td>{candidates.find(candidate => candidate.id === parseInt(userId, 10)).email}</td>
                    <td>{userVotes[userId]?.[office] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainApp;
