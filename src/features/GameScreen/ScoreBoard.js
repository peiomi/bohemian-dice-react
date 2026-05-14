import React from 'react';

const ScoreBoard = ({ player, playerTurnScore, playerTotalScore, aiTurnScore, aiTotalScore, goal }) => {
    return (
        <div className='score-panel'>
            <div className='goal-row'>Goal: {goal}</div>
            <div className='player row2'>{player.name} </div>
            <div className='player row3'>Turn Score: {playerTurnScore}</div>
            <div className='player row4'>Total Score: {playerTotalScore}</div>
            <div className='ai row2'>Opponent</div>
            <div className='ai row3'>Turn Score: {aiTurnScore}</div>
            <div className='ai row4'>Total Score: {aiTotalScore}</div>
        </div>
    );
};

export default ScoreBoard;