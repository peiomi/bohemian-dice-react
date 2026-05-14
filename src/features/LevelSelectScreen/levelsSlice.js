import { createSlice } from '@reduxjs/toolkit';
import LEVELS from '../../app/shared/data/LEVELS';

const initialState = {
  levels: LEVELS,
  selectedLevel: null
};

const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    setSelectedLevel(state, action) {
      const payload = action.payload;

      if (typeof payload === 'number') {
        state.selectedLevel = state.levels.find(level => level.level === payload) || null;
      } else {
        state.selectedLevel = payload;
      }
    },
    resetSelectedLevel(state) {
      state.selectedLevel = null;
    },
    setLevels(state, action) {
      state.levels = action.payload;
      if (state.selectedLevel) {
        state.selectedLevel = state.levels.find(level => level.level === state.selectedLevel.level) || null;
      }
    }
  }
});

export const { setSelectedLevel, resetSelectedLevel, setLevels } = levelsSlice.actions;

export const selectLevels = (state) => state.levels.levels;
export const selectSelectedLevel = (state) => state.levels.selectedLevel;
export const selectLevelByNumber = (state, levelNumber) =>
  state.levels.levels.find(level => level.level === levelNumber) || null;
export const selectNextLevel = (state, currentLevel) =>
  state.levels.levels.find(level => level.level === currentLevel + 1) || null;
export const selectIsLastLevel = (state, levelNumber) => {
  const levels = state.levels.levels;
  return levelNumber === levels[levels.length - 1]?.level;
};

export default levelsSlice.reducer;
