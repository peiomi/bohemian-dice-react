import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import MainMenu from './screens/MainMenu/MainMenu';
import GameScreen from './screens/GameScreen/GameScreen';
import InventoryScreen from './screens/InventoryScreen/InventoryScreen';
import RulesPage from './screens/RulesPage/RulesPage';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import LevelSelectScreen from './screens/LevelSelectScreen/LevelSelectScreen';

import Player from './systems/Player';
import { getLevelConfig } from './systems/levelConfig';

const AppRoutes = ({ player, setPlayer, selectedLevel, setSelectedLevel, loading, setLoading }) => {
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
            player.setLoadout(dice, badge);
        };

    return (
        <Routes>
          <Route
            path='login'
            element={<LoginScreen onLogin={(name) => setPlayer(new Player(name))} />}
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