import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MainMenu from './screens/MainMenu/MainMenu';
import GameScreen from './screens/GameScreen/GameScreen';
import InventoryScreen from './screens/InventoryScreen/InventoryScreen';
import RulesPage from './screens/RulesPage/RulesPage';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

import Player from './systems/Player';
import { getLevelConfig } from './systems/levelConfig';

import './css/variables.css';
import './css/globals.css';

function App() {
  const [screen, setScreen] = useState('loading');
  const [player, setPlayer] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('login');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (name) => {
    const newPlayer = new Player(name);
    setPlayer(newPlayer);
    setScreen('menu');
  };

  const handleLoadoutSelect = (dice, badge) => {
    player.setLoadout(dice, badge);
  };

  if (screen === 'loading') return <LoadingScreen />;
  if (screen === 'login') return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={<MainMenu player={player} />} 
          />
          <Route 
            path='game' 
            element={<GameScreen player={player} levelConfig={getLevelConfig(1)} />} 
          />
          <Route 
            path='rules' 
            element={<RulesPage />} 
          />
          <Route 
            path='inventory' 
            element={<InventoryScreen player={player} mode='view' />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
