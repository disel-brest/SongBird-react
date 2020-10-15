import React from 'react';
import './App.scss';
import GuessBird from './components/GuessBird/GuessBird';
import Header from './components/Header';
import RandomBird from './components/RandomBird/RandomBird';



function App() {
  return (
    <div className='wrapper'>
      <Header />
      <RandomBird />
      <GuessBird />
    </div>
  );
}

export default App;