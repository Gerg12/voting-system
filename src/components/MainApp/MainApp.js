import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import './MainApp.css';
import candidates from '../../data/candidates';

const offices = ['President', 'Vice President', 'Treasurer', 'Secretary'];

const MainApp = () => {
  const [userVotes, setUserVotes] = useState(() => {
    const storedVotes = localStorage.getItem('userVotes');
    return storedVotes ? JSON.parse(storedVotes) : {};
  });

  const [results, setResults] = useState(() => {
    const storedResults = localStorage.getItem('votingResults');
    return storedResults ? JSON.parse(storedResults) : {};
  });

  useEffect(() => {
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
  }, [userVotes]);

  useEffect(() => {
    localStorage.setItem('votingResults', JSON.stringify(results));
  }, [results]);

  const handleVote = (userId, office) => {
    setUserVotes((prevVotes) => ({
      ...prevVotes,
      [userId]: { ...prevVotes[userId], [office]: (prevVotes[userId]?.[office] || 0) + 1 },
    }));

    setResults((prevResults) => ({
      ...prevResults,
      [office]: [...(prevResults[office] || []), userId],
    }));
  };

  const clearResults = () => {
    localStorage.removeItem('userVotes');
    localStorage.removeItem('votingResults');
    setUserVotes({});
    setResults({});
  };

  const getUserVotesByOffice = (office) => {
    return Object.keys(userVotes)
      .filter((userId) => userVotes[userId]?.[office])
      .sort((a, b) => userVotes[b][office] - userVotes[a][office]);
  };

  return (
    <section className="gutter">
      <div className="container">
        <UserList onVote={handleVote} />

        <h2>Results</h2>
        <button onClick={clearResults}>Clear Results</button>
        {offices.map((office) => (
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
                {getUserVotesByOffice(office).map((userId) => (
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
        ))}
      </div>
    </section>
  );
};

export default MainApp;
