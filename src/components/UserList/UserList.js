// src/components/UserList/UserList.js
import React, { useState, useEffect } from 'react';

const UserList = ({ onVote }) => {
  const [users, setUsers] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(''); // Added state for selected office

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleVote = userId => {
    // Pass both userId and selectedOffice to the onVote function
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleVote(user.id)}
                  disabled={!selectedOffice}
                >
                  Vote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
