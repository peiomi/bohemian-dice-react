import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  inventory: {
    dice: [],
    badges: []
  },
  unlockedLevels: 1,
  loadout: null
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer(state, action) {
      return { ...state, ...action.payload };
    },
    setLoadout(state, action) {
      state.loadout = action.payload;
    },
    addDie(state, action) {
      state.inventory.dice.push(action.payload);
    },
    addBadge(state, action) {
      state.inventory.badges.push(action.payload);
    },
    unlockLevel(state, action) {
      state.unlockedLevels = action.payload;
    },
    clearPlayer() {
      return initialState;
    }
  }
});

export const {
  setPlayer,
  setLoadout,
  addDie,
  addBadge,
  unlockLevel,
  clearPlayer
} = playerSlice.actions;

export default playerSlice.reducer;
