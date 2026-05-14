import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import MainMenu from './features/MainMenu/MainMenu';
import GameScreen from './features/GameScreen/GameScreen';
import InventoryScreen from './features/InventoryScreen/InventoryScreen';
import RulesPage from './features/RulesPage/RulesPage';
import LoadingScreen from './features/LoadingScreen/LoadingScreen';
import LoginScreen from './features/LoginScreen/LoginScreen';
import LevelSelectScreen from './features/LevelSelectScreen/LevelSelectScreen';

const AppRoutes = ({ player, setPlayer, selectedLevel, setSelectedLevel, loading, setLoading, setPlayerLoadout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  const handleLoadoutSelect = (dice, badge) => {
    if (setPlayerLoadout) {
      setPlayerLoadout(dice, badge);
    }
  };

  return (
    <Routes>
      <Route
        path='login'
        element={<LoginScreen onLogin={setPlayer} />}
      />
      <Route
        path='/'
        element={<MainMenu player={player} />}
      />
      <Route
        path='game'
        element={<GameScreen player={player} levelConfig={selectedLevel} />}
      />
      <Route
        path='rules'
        element={<RulesPage />}
      />
      <Route
        path='level-select'
        element={<LevelSelectScreen player={player} onSelectLevel={setSelectedLevel} />}
      />
      <Route
        path='inventory/:mode'
        element={<InventoryScreen player={player} onLoadoutSelected={handleLoadoutSelect} />}
      />
    </Routes>
  );

};

export default AppRoutes;