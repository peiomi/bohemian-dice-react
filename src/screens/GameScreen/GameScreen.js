import React, { useEffect, useState } from 'react';
import { useGameState } from '../../hooks/useGameState';

import DiceArea from './DiceArea';
import ScoreBoard from './ScoreBoard';
import Button from '../../components/Button';
import TurnSummaryModal from './TurnSummaryModal';
import SubHeader from '../../components/SubHeader';
import { normalDie } from '../../data/DICE-LIST';

import './game-screen.css';

const GameScreen = ({ player, levelConfig }) => {
    const playerState = useGameState(false);
    const aiState = useGameState(true);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [phase, setPhase] = useState('player');

    useEffect(() => {
        if (!player || !levelConfig) return;

        const loadout = player.loadout || {};
        const diceLoadout = Array.isArray(loadout.dice) ? loadout.dice : Array(6).fill(normalDie);
        const badgeLoadout = loadout.badge || null;

        playerState.initialize(diceLoadout, badgeLoadout);
        playerState.state.goal = levelConfig.goal;

        const aiDice = Array(6).fill(normalDie);
        const aiBadge = null;

        aiState.initialize(aiDice, aiBadge);
        aiState.state.goal = levelConfig.goal;

        playerState.startTurn();

    }, [player, levelConfig]);

    const handleRoll = () => {
        playerState.rollDice();
    };

    const handleFinalizeRoll = () => {
        playerState.finalizeRoll();

        if (playerState.busted) {
            showTurnSummary("Bust!", 0, playerState.totalScore);
            setPhase('ai');
        }
    };

    const handleScoreAndCont = () => {
        playerState.applyScoring();

        if (playerState.totalScore >= playerState.state.goal) {
            showTurnSummary('You Win!', playerState.turnScore, playerState.totalScore);
            setPhase('end');
            return;
        }

        playerState.startTurn();
    };

    const handleEndTurn = () => {
        playerState.applyScoring();
        showTurnSummary('Turn Summary', playerState.turnScore, playerState.totalScore);
        setPhase('ai');
    };

    useEffect(() => {
        if (phase !== 'ai') return;
        aiState.startTurn();

        const timer = () => setTimeout(() => {
            aiState.finalizeRoll();

            if (aiState.totalScore >= aiState.state.goal) {
                showTurnSummary('You Lose :/', aiState.turnScore, aiState.totalScore);
                setPhase('end');
                return;
            }

            playerState.startTurn();
            setPhase('player');
        }, 800);

        return () => clearTimeout(timer);
    }, [phase]);

    const showTurnSummary = (title, turnScore, totalScore) => {
        setModalData({ title, turnScore, totalScore });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return(
        <div className='game-screen'>
            <SubHeader text={`${player.name} - Level ${levelConfig.level}`} />
            <DiceArea name='ai' />
            <DiceArea name='player' />
            <Button text='Roll' />
            <Button text='Score & Pass' />
            <Button text='Score & Continue' />
            <ScoreBoard 
                player={player}
                playerState={playerState}
                aiState={aiState}
                goal={playerState.state.goal}
            />
        </div>
    );
};

export default GameScreen;