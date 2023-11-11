import React, { useState } from 'react';

const VotingSystem = ({ title, onVote }) => {
  const [votes, setVotes] = useState({});

  const vote = userId => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [userId]: (prevVotes[userId] || 0) + 1,
    }));

    onVote(userId, title);
  };

  return (
    <div>
      <h2>{title} Voting System</h2>
      <p>Votes:</p>
      <ul>
        {Object.entries(votes).map(([userId, count]) => (
          <li key={userId}>
            User ID {userId}: {count} votes
          </li>
        ))}
      </ul>
      <p>Vote for users in the User List above for the role of {title}:</p>
      <p>(Votes are cumulative)</p>
      <hr />
      <p>Click the "Vote" button next to each user to register your vote for {title}.</p>
    </div>
  );
};

export default VotingSystem;
