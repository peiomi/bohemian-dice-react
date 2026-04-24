import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainMenu from './screens/MainMenu/MainMenu';
import GameScreen from './screens/GameScreen/GameScreen';
import InventoryScreen from './screens/InventoryScreen/InventoryScreen';
import RulesPage from './screens/RulesPage/RulesPage';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import './css/variables.css';
import './css/globals.css';

function App() {
  const [screen, setScreen] = useState('loading');
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('login');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (name) => {
    setPlayerName(name);
    setScreen('menu');
  };

  if (screen === 'loading') return <LoadingScreen />;
  if (screen === 'login') return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainMenu />} />
          <Route path='game' element={<GameScreen />} />
          <Route path='rules' element={<RulesPage />} />
          <Route path='inventory' element={<InventoryScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
