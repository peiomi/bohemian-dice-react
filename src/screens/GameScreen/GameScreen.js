import React, { useEffect, useState } from 'react';
import { useGameState } from '../../hooks/useGameState';

import DiceArea from './DiceCanvas/DiceArea';
import ScoreBoard from './ScoreBoard';
import Button from '../../components/Button';
import TurnSummaryModal from './TurnSummaryModal';
import Header from '../../components/SubHeader';
import { normalDie } from '../../data/DICE-LIST';
import { scoreDice } from '../../systems/scoring';

import './game-screen.css';

const GameScreen = ({ player, levelConfig }) => {
    const playerState = useGameState(false);
    const aiState = useGameState(true);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [phase, setPhase] = useState('player');
    const [refresh, setRefresh] = useState(0);

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
        playerState.dice.forEach(d => {
            if (!d.kept && !d.removed) {
                d.rolling = true;
            }
        });

        setRefresh(r => r + 1);

        setTimeout(() => {
            playerState.dice.forEach(d => {
                if (d.rolling) {
                    d.value = Math.floor(Math.random() *6) + 1;
                    d.rolling = false;
                }
            });
            setRefresh(r => r + 1);
        }, 550);
    };

    const handleFinalizeRoll = () => {
        playerState.finalizeRoll();

        if (playerState.busted) {
            showTurnSummary("Bust!", 0, playerState.totalScore);
            setPhase('ai');
        }
    };

    const onDieClick = (i) => {
        const die = playerState.dice[i];
        die.kept = !die.kept;
        setRefresh(r => r + 1);
    };

    const handleScoreAndCont = () => {
        const keptValues = playerState.dice.filter(d => d.kept).map(d => d.value);
        const gained = scoreDice(keptValues, playerState.state);

        playerState.dice.forEach(d => {
            if (d.kept) {
                d.kept = false;
                d.removed = true;
            }
        });

        playerState.applyScoring(gained);

        if (playerState.totalScore >= playerState.state.goal) {
            showTurnSummary('You Win!', playerState.turnScore, playerState.totalScore);
            setPhase('end');
            return;
        }

        playerState.startTurn();
        setRefresh(r => r + 1);
    };

    const handleEndTurn = () => {
        const keptValues = playerState.dice.filter(d => d.kept).map(d => d.value);
        const gained = scoreDice(keptValues, playerState.state);

        playerState.dice.forEach(d => {
            if (d.kept) {
                d.kept = false;
                d.removed = true;
            }
        });

        playerState.applyScoring(gained);
        showTurnSummary('Turn Summary', playerState.turnScore, playerState.totalScore);
        setPhase('ai');
        setRefresh(r => r + 1);
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
                <Button text='Score & Pass' onClick={handleEndTurn} />
                <Button text='Score & Continue' onClick={handleScoreAndCont} />
            </div>
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