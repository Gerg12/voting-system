import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import ResultsList from '../ResultsList/ResultsList';
import './MainApp.css';
import candidates from '../../data/candidates';

// Define the offices as constants to avoid magic strings
const offices = ['President', 'Vice President', 'Treasurer', 'Secretary'];

// Main component for the voting application
const MainApp = () => {
  // State to store user votes
  const [userVotes, setUserVotes] = useState(() => {
    // Retrieve user votes from local storage or initialize as an empty object
    const storedVotes = localStorage.getItem('userVotes');
    return storedVotes ? JSON.parse(storedVotes) : {};
  });

  // State to store voting results
  const [results, setResults] = useState(() => {
    // Retrieve voting results from local storage or initialize as an empty object
    const storedResults = localStorage.getItem('votingResults');
    return storedResults ? JSON.parse(storedResults) : {};
  });

  // Effect to update local storage when userVotes state changes
  useEffect(() => {
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
  }, [userVotes]);

  // Effect to update local storage when results state changes
  useEffect(() => {
    localStorage.setItem('votingResults', JSON.stringify(results));
  }, [results]);

  // Function to handle user votes
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

  // Function to clear results and reset state
  const clearResults = () => {
    localStorage.removeItem('userVotes');
    localStorage.removeItem('votingResults');
    setUserVotes({});
    setResults({});
  };

  // Render the main application
  return (
    <section className="gutter">
      <div className="container">
        {/* Component to display the list of users and handle voting */}
        <UserList onVote={handleVote} />

        {/* Results section */}
        <h2>Results</h2>
        {/* Button to clear results and reset state */}
        <button onClick={clearResults}>Clear Results</button>
        {/* Display results for each office */}
        {offices.map((office) => (
          <ResultsList key={office} office={office} userVotes={userVotes} candidates={candidates} />
        ))}
      </div>
    </section>
  );
};

export default MainApp;
