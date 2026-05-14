import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import Player from './features/player/Player';
import { setPlayer, setLoadout } from './features/player/playerSlice';
import { setLoading } from './features/ui/uiSlice';
import { setSelectedLevel } from './features/LevelSelectScreen/levelsSlice';

import './App.css';

function App() {
  const player = useSelector((state) => state.player);
  const selectedLevel = useSelector((state) => state.levels.selectedLevel);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  const handleSetPlayer = (name) => {
    dispatch(setPlayer({ ...new Player(name), loadout: null }));
  };

  const handleSetSelectedLevel = (level) => {
    dispatch(setSelectedLevel(level));
  };

  const handleSetLoading = (value) => {
    dispatch(setLoading(value));
  };

  const handleSetPlayerLoadout = (dice, badge) => {
    dispatch(setLoadout({ dice, badge }));
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <AppRoutes
          player={player}
          setPlayer={handleSetPlayer}
          selectedLevel={selectedLevel}
          setSelectedLevel={handleSetSelectedLevel}
          loading={loading}
          setLoading={handleSetLoading}
          setPlayerLoadout={handleSetPlayerLoadout}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
