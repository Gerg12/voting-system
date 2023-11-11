// src/components/MainApp/MainApp.js
import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import VotingSystem from '../VotingSystem/VotingSystem';
import './MainApp.css';

const offices = ['President', 'Vice President', 'Treasurer', 'Secretary'];

const MainApp = () => {
  const [userVotes, setUserVotes] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

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

  const getUserData = userId => {
    const user = users.find(user => user.id === parseInt(userId, 10));
    return user ? { name: user.name, email: user.email } : { name: '', email: '' };
  };

  return (
    <section className="gutter">
      <div className="container">
        <UserList onVote={handleVote} />
        <div className="voting-systems">
          {offices.map(office => (
            <VotingSystem key={office} title={office} onVote={handleVote} />
          ))}
        </div>
        <h2>Results</h2>
        {offices.map(office => (
          <div key={office}>
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
                {getUserVotesByOffice(office).map(userId => {
                  const userData = getUserData(userId);
                  return (
                    <tr key={userId}>
                      <td>{userId}</td>
                      <td>{userData.name}</td>
                      <td>{userData.email}</td>
                      <td>{userVotes[userId]?.[office] || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainApp;
