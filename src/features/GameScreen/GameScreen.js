import React, { useEffect, useState } from 'react';
// import { useGameState } from '../../utils/hooks/useGameState';
import { useDispatch, useSelector } from 'react-redux';

import DiceArea from './DiceCanvas/DiceArea';
import ScoreBoard from './ScoreBoard';
import Button from '../../components/Button';
import TurnSummaryModal from './TurnSummaryModal';
import Header from '../../components/SubHeader';

import { normalDie } from '../../app/shared/data/DICE-LIST';
import { scoreDice, scoringCombination } from '../../utils/scoring';
import { applyMightBonus, applyScoreMultiplier } from '../../utils/badgeEffects';

import {
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
  startAiTurn,
  rollAiDice,
  finalizeAiRoll,
  endAiTurn
} from './gameSlice'; 

import './game-screen.css';

const GameScreen = ({ player, levelConfig }) => {
    const dispatch = useDispatch();
    const playerState = useSelector(state => state.game.player);
    const aiState = useSelector(state => state.game.ai);
    const phase = useSelector(state => state.game.phase);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalCloseAction, setModalCloseAction] = useState(null);

    useEffect(() => {
        if (!player || !levelConfig) return;

        const loadout = player.loadout || {};
        const diceLoadout = Array.isArray(loadout.dice) ? loadout.dice : Array(6).fill(normalDie);
        const badgeLoadout = loadout.badge || null;

        dispatch(
            initializePlayer({
                diceLoadout,
                badge: badgeLoadout,
                goal: levelConfig.goal
            })
        );

        dispatch(
            initializeAI({
                goal: levelConfig.goal
            })
        );

        dispatch(startPlayerTurn());
    }, [player, levelConfig, dispatch]);

    const showTurnSummary = (title, turnScore, totalScore, onClose = null) => {
        setModalData({ title, turnScore, totalScore });
        setModalCloseAction(() => onClose);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        if (modalCloseAction) {
            modalCloseAction();
            setModalCloseAction(null);
        }
    };

    const handleRoll = () => {
        dispatch(rollPlayerDice());

        setTimeout(() => {
            dispatch(finalizePlayerRoll());
            if (playerState.totalScore >= playerState.goal) {
                showTurnSummary('You Win!', playerState.turnScore, playerState.totalScore, () =>
                    dispatch(setPhase('end'))
                );
                return;
            }
            const rolledValues = playerState.dice
                .filter(d => !d.removed)
                .map(d => d.value)
                .filter(v => v != null);
        }, 550);
    };

    const onDieClick = (i) => {
        dispatch(togglePlayerDieKept(i));
    };

    const handleScoreAndCont = () => {
        dispatch(scoreAndContinue());
        dispatch(rollPlayerDice());

        setTimeout(() => {
            dispatch(finalizePlayerRoll());

            const turnScore = playerState.turnScore;
            const totalScore = playerState.totalScore;
            if (totalScore + turnScore >= playerState.goal) {
                dispatch(addPlayerTurnToTotal());
                showTurnSummary('You Win!', playerState.turnScore, playerState.totalScore, 
                    () => dispatch(setPhase('end'))
                );
                return;
            }
            dispatch(startPlayerTurn());
        }, 550);
    };

    const handleEndTurn = () => {
        const keptValues = playerState.dice
            .filter(d => d.kept)
            .map(d => d.value);
        let gained = scoreDice(keptValues, playerState);
        gained = applyMightBonus(gained, playerState.badge);
        gained = applyScoreMultiplier(gained, playerState.badge);

        const turnPoints = playerState.turnScore + gained;
        const totalPoints = playerState.totalScore + turnPoints;
        dispatch(scoreAndEndTurn(gained));


        if (totalPoints >= playerState.goal) {
            showTurnSummary('You Win!', turnPoints, totalPoints, () =>
                dispatch(setPhase('end'))
            );
            return;
        }

        showTurnSummary('Turn Summary', turnPoints, totalPoints, () => 
            dispatch(setPhase('ai'))
        );
    };

    const handleAIRoll = () => {
        dispatch(rollAiDice());

        setTimeout(() => {
            dispatch(finalizeAiRoll());

            if (aiState.totalScore + aiState.turnScore >= aiState.goal) {
                dispatch(endAiTurn());
                showTurnSummary('You Lose :/', aiState.turnScore, aiState.totalScore, () =>
                    dispatch(setPhase('end'))
                );
                return;
            }

            dispatch(endAiTurn());
            dispatch(newPlayerTurn());
            dispatch(setPhase('player'));
        }, 550);
    };

    useEffect(() => {
        if (phase !== 'ai') return;
        dispatch(startAiTurn());
        handleAIRoll();
    }, [phase, dispatch]);
    
    if (!levelConfig || !playerState) return null;

    return (
        <div className='game-screen'>
            <Header
                className='game-screen-header'
                text={`Level ${levelConfig.level}`}
            />
            <DiceArea
                name='Opponent'
                type='ai'
                dice={aiState.dice}
            />
            <DiceArea
                name={player.name}
                type='player'
                dice={playerState.dice}
                onDieClick={onDieClick}
            />
            <div className='controls'>
                <Button text='Roll' onClick={handleRoll} />
                <Button text='Score & Continue' onClick={handleScoreAndCont} />
                <Button text='Score & Pass' onClick={handleEndTurn} />
            </div>
            <ScoreBoard
                player={player}
                playerTurnScore={playerState.turnScore}
                playerTotalScore={playerState.totalScore}
                aiTurnScore={aiState.turnScore}
                aiTotalScore={aiState.totalScore}
                goal={playerState.goal}
            />
            <TurnSummaryModal
                isOpen={showModal}
                toggle={closeModal}
                modalData={modalData}
            />
        </div>
    );
};

export default GameScreen;