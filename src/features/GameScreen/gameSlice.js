import { createSlice } from '@reduxjs/toolkit';
import { normalDie } from '../../app/shared/data/DICE-LIST';
import {
    applyHeadstart,
    applyScoreMultiplier,
    applyMightBonus,
    applyResurrect,
    applyTransmutation
} from '../../utils/badgeEffects';
import { scoreDice, scoringCombination } from '../../utils/scoring';

const createDie = (d) => {
    const dieInstance = d && typeof d.roll === 'function' ? d : d?.die;
    return {
        ...d,
        die: dieInstance || normalDie,
        kept: false,
        removed: false,
        value: null,
        rolling: false
    };
};

const createDiceArray = (diceArray) => (diceArray && diceArray.length ? diceArray : Array(6).fill(normalDie)).map(createDie);

const initialPlayerState = () => ({
    dice: [],
    turnScore: 0,
    totalScore: 0,
    busted: false,
    badge: null,
    badgeState: { usesLeft: 0 },
    goal: 0
});

const initialAiState = () => ({
    dice: createDiceArray(Array(6).fill(normalDie)),
    turnScore: 0,
    totalScore: 0,
    busted: false,
    badge: null,
    badgeState: { usesLeft: 0 },
    goal: 0
});

const initialState = {
    player: initialPlayerState(),
    ai: initialAiState(),
    phase: 'player'
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initializePlayer(state, action) {
            const { diceLoadout, badge, goal } = action.payload;

            state.player.dice = createDiceArray(diceLoadout);
            state.player.badge = badge || null;
            state.player.goal = goal;
            state.player.turnScore = 0;
            state.player.totalScore = 0;
            state.player.busted = false;
            state.player.badgeState = { usesLeft: badge ? badge.uses : 0 };

            applyHeadstart(state.player, badge); 
        },
        initializeAI(state, action) {
            const { goal } = action.payload;
            state.ai = initialAiState();
            state.ai.goal = goal;
        },
        setPhase(state, action) {
            state.phase = action.payload;
        },
        startPlayerTurn(state) {
            const p = state.player;
            p.busted = false;
            p.dice.forEach(d => {
                if (!d.removed) {
                    d.kept = false;
                    d.value = null;
                }
            });
        },
        newPlayerTurn(state) {
            const p = state.player;
            p.turnScore = 0;
            p.busted = false;
            p.dice.forEach(d => {
                d.kept = false;
                d.removed = false;
                d.value = null;
                d.rolling = false;
            });
        },
        rollPlayerDice(state) {
            const p = state.player;
            const noDiceLeftToRoll = p.dice.every(d => d.kept || d.removed);
            if (noDiceLeftToRoll) return;

            p.dice.forEach(d => {
                if (!d.kept && !d.removed) {
                    d.rolling = true;
                }
            });
        },
        finalizePlayerRoll(state) {
            const p = state.player;

            p.dice.forEach(d => {
                if (d.rolling) {
                    d.value = d.die?.roll ? d.die.roll() : Math.floor(Math.random() * 6) + 1;
                    d.rolling = false;
                }
            });

            const rolledValues = p.dice
                .filter(d => !d.removed)
                .map(d => d.value)
                .filter(v => v != null);

            if (!scoringCombination(rolledValues)) {
                const saved = applyResurrect(p, p.badge, p.badgeState);

                if (saved) {
                    p.badgeState.usesLeft -= 1;
                    p.turnScore = 0;
                    return;
                }
                p.turnScore = 0;
                p.totalScore = 0;
                p.busted = true;
                return;
            }
        },
        togglePlayerDieKept(state, action) {
            const index = action.payload;
            const die = state.player.dice[index];
            if (!die || die.removed) return;
            die.kept = !die.kept;
        },
        scoreAndContinue(state) {
            const p = state.player;
            const keptValues = p.dice.filter(d => d.kept).map(d => d.value);
            let gained = scoreDice(keptValues, p);
            gained = applyMightBonus(gained, p.badge);
            gained = applyScoreMultiplier(gained, p.badge);

            p.turnScore += gained;

            p.dice.forEach(d => {
                if (d.kept) {
                    d.kept = false;
                    d.removed = true;
                }
            });

            const allDiceScored = p.dice.every(d => d.removed);
            if (allDiceScored) {
                p.dice.forEach(d => {
                    d.removed = false;
                    d.value = null;
                    d.kept = false;
                    d.rolling = false;
                });
            }
        },
        scoreAndEndTurn(state, action) {
            const p = state.player;
            const gained = action.payload;

            p.turnScore += gained;
            p.totalScore += p.turnScore;

            p.dice.forEach(d => {
                if (d.kept) {
                    d.kept = false;
                    d.removed = true;
                }
            });

            p.turnScore = 0;
        },
        addPlayerTurnToTotal(state) {
            const p = state.player;
            p.totalScore += p.turnScore;
            p.turnScore = 0;
        },
        usePlayerTransmutation(state, action) {
            const p = state.player;
            const targetDieId = action.payload;

            const updatedDice = applyTransmutation(p.dice, p.badge, targetDieId);
            p.dice = updatedDice;
            p.badgeState.usesLeft -= 1;
        },
        startAiTurn(state) {
            const ai = state.ai;
            ai.turnScore = 0;
            ai.busted = false;
            ai.dice.forEach(d => {
                d.kept = false;
                d.removed = false;
                d.value = null;
                d.rolling = false;
            });
        },
        rollAiDice(state) {
            const ai = state.ai;
            ai.dice.forEach(d => {
                if (!d.removed) {
                    d.rolling = true;
                }
            });
        },
        finalizeAiRoll(state) {
            const ai = state.ai;
            const rolledDice = ai.dice.map(d => {
                if (!d.removed) {
                    return {
                        ...d,
                        value: d.die?.roll ? d.die.roll() : Math.floor(Math.random() * 6) + 1,
                        rolling: false,
                        kept: false
                    };
                }
                return d;
            });

            ai.dice = rolledDice;

            const keptValues = rolledDice
                .filter(d => !d.removed)
                .map(d => d.value)
                .filter(v => v != null);

            if (!scoringCombination(keptValues)) {
                const saved = applyResurrect(ai, ai.badge, ai.badgeState);
                if (saved) {
                    ai.badgeState.usesLeft -= 1;
                    ai.turnScore = 0;
                    return;
                }
                ai.turnScore = 0;
                ai.totalScore = 0;
                ai.busted = true;
                return;
            }

            let gained = scoreDice(keptValues, ai);
            gained = applyMightBonus(gained, ai.badge);
            gained = applyScoreMultiplier(gained, ai.badge);

            ai.turnScore += gained;
        },
        endAiTurn(state) {
            const ai = state.ai;
            ai.totalScore += ai.turnScore;
            ai.turnScore = 0;
        }

    }
});

export const {
    initializePlayer,
    initializeAI,
    setPhase,
    startPlayerTurn,
    newPlayerTurn,
    rollPlayerDice,
    finalizePlayerRoll,
    togglePlayerDieKept,
    scoreAndContinue,
    scoreAndEndTurn,
    addPlayerTurnToTotal,
    usePlayerTransmutation,
    startAiTurn,
    rollAiDice,
    finalizeAiRoll,
    endAiTurn
} = gameSlice.actions;

export default gameSlice.reducer;
