import React from 'react';
import MainApp from './components/MainApp/MainApp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <img
          src="https://via.placeholder.com/150"
          alt="Logo Placeholder"
          className="logo"
        />
        <h1>Voting Site</h1>
      </header>
      <MainApp />
    </div>
  );
}

export default App;
