import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice';
import uiReducer from '../features/ui/uiSlice';
import levelsReducer from '../features/LevelSelectScreen/levelsSlice';
import gameReducer from '../features/GameScreen/gameSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    ui: uiReducer,
    levels: levelsReducer,
    game: gameReducer
  }
});
