import { useRef, useState } from 'react';
import GameState from '../systems/GameState';
import { 
    applyHeadstart, 
    applyScoreMultiplier,
    applyMightBonus,
    applyResurrect,
    applyTransmutation
} from '../systems/badgeEffects';

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

    const applyScoring = (baseScore) => {
        let score = baseScore;

        score = applyMightBonus(score, gameStateRef.current.badge);
        score = applyScoreMultiplier(score, gameStateRef.current.badge);

        gameStateRef.current.applyScore(score);

        setTurnScore(gameStateRef.current.turnScore);
        setTotalScore(gameStateRef.current.totalScore);
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
        setTurnScore(0);
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
        applyScoring,
        handleBust,
        useTransmutation,

        // GameState
        state: gameStateRef.current
    };
};
