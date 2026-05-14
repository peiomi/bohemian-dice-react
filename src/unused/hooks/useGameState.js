import { useRef, useState } from 'react';
import GameState from '../GameState';
import {
    applyHeadstart,
    applyScoreMultiplier,
    applyMightBonus,
    applyResurrect,
    applyTransmutation
} from '../badgeEffects';
import { scoreDice, scoringCombination } from '../scoring';

export const useGameState = (isAI = false) => {
    // GameState instance
    const gameStateRef = useRef(new GameState(isAI));

    // UI updates
    const [dice, setDice] = useState(gameStateRef.current.dice);
    const [turnScore, setTurnScore] = useState(gameStateRef.current.turnScore);
    const [totalScore, setTotalScore] = useState(gameStateRef.current.totalScore);
    const [busted, setBusted] = useState(gameStateRef.current.busted);
    const [badgeState, setBadgeState] = useState({ usesLeft: 0 });


    // initializes dice/badge 
    const initialize = (diceArray, badge) => {
        gameStateRef.current.setDice(diceArray);
        gameStateRef.current.setBadge(badge);

        applyHeadstart(gameStateRef.current, badge);

        setDice([...gameStateRef.current.dice]);
        setTotalScore(gameStateRef.current.totalScore);

        setBadgeState({ usesLeft: badge ? badge.uses : 0 });
    };

    const startTurn = () => {
        gameStateRef.current.startTurn();
        setTurnScore(0);
        setBusted(false);
        setDice([...gameStateRef.current.dice]);
    };

    const newTurn = () => {
        gameStateRef.current.newTurn();
        setTurnScore(0);
        setBusted(false);
        setDice([...gameStateRef.current.dice]);
    };

    const applyScoring = (baseScore) => {
        let score = baseScore;

        score = applyMightBonus(score, gameStateRef.current.badge);
        score = applyScoreMultiplier(score, gameStateRef.current.badge);

        gameStateRef.current.applyScore(score);

        setTurnScore(gameStateRef.current.turnScore);
    };

    const handleBust = () => {
        const saved = applyResurrect(
            gameStateRef.current,
            gameStateRef.current.badge,
            badgeState
        );

        if (saved) {
            setBadgeState({ usesLeft: badgeState.usesLeft - 1 });
            setTurnScore(0);
            return;
        }

        gameStateRef.current.bust();
        gameStateRef.current.totalScore = 0; 
        setTurnScore(0);
        setTotalScore(0);
        setBusted(true);
    };

    const useTransmutation = (targetDieId) => {
        const updatedDice = applyTransmutation(
            gameStateRef.current.dice,
            gameStateRef.current.badge,
            targetDieId
        );

        gameStateRef.current.dice = updatedDice;
        setDice([...updatedDice]);

        setBadgeState({
            usesLeft: badgeState.usesLeft - 1
        });
    };

    const endTurn = () => {
        gameStateRef.current.totalScore += gameStateRef.current.turnScore;
        gameStateRef.current.turnScore = 0;
        setTurnScore(0);
        setTotalScore(gameStateRef.current.totalScore);
        return gameStateRef.current.totalScore;
    };

    const addTurnToTotal = () => {
        gameStateRef.current.totalScore += gameStateRef.current.turnScore;
        setTotalScore(gameStateRef.current.totalScore);
        return gameStateRef.current.totalScore;
    };

    const finalizeRoll = () => {
        const rolledDice = gameStateRef.current.dice.map(d => {
            if (!d.removed) {
                return {
                    ...d,
                    value: Math.floor(Math.random() * 6) + 1,
                    rolling: false,
                    kept: false
                };
            }
            return d;
        });

        gameStateRef.current.dice = rolledDice;
        setDice([...rolledDice]);

        const keptValues = rolledDice
            .filter(d => !d.removed)
            .map(d => d.value)
            .filter(v => v != null);

        if (!scoringCombination(keptValues)) {
            handleBust();
            return;
        }

        const gained = scoreDice(keptValues, gameStateRef.current);
        gameStateRef.current.applyScore(gained);
        setTurnScore(gameStateRef.current.turnScore);
        setTotalScore(gameStateRef.current.totalScore);
    };

    return {
        // ui state
        dice,
        turnScore,
        totalScore,
        busted,
        badgeState,

        // actions
        initialize,
        startTurn,
        newTurn,
        applyScoring,
        handleBust,
        useTransmutation,
        finalizeRoll,
        endTurn,
        addTurnToTotal,

        // GameState
        state: gameStateRef.current
    };

};
