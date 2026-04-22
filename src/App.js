import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainMenu from './screens/MainMenu/MainMenu';
import GameScreen from './screens/GameScreen';
import InventoryScreen from './screens/InventoryScreen';
import RulesPage from './screens/RulesPage';
import LoadingScreen from './screens/LoadingScreen';
import NameScreen from './screens/NameScreen/NameScreen'
import './css/variables.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainMenu />} />
          <Route path='name-input' element={<NameScreen />} />
          <Route path='game' element={<GameScreen />} />
          <Route path='rules' element={<RulesPage />} />
          <Route path='inventory' element={<InventoryScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
