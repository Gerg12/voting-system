import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import ResultsList from '../ResultsList/ResultsList';
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

  return (
    <section className="gutter">
      <div className="container">
        <UserList onVote={handleVote} />

        <h2>Results</h2>
        <button onClick={clearResults}>Clear Results</button>
        {offices.map((office) => (
          <ResultsList key={office} office={office} userVotes={userVotes} candidates={candidates} />
        ))}
      </div>
    </section>
  );
};

export default MainApp;
