import React from 'react';

const ScoreBoard = ({ player, playerState, aiState, goal }) => {
    return (
        <div className='score-panel'>
            <div className='goal-row'>Goal: {goal}</div>
            <div className='player row2'>{player.name} </div>
            <div className='player row3'>Turn Score: {playerState.turnScore}</div>  
            <div className='player row4'>Total Score: {playerState.totalScore}</div>
            <div className='ai row2'>Opponent</div>
            <div className='ai row3'>Turn Score: {aiState.turnScore}</div>  
            <div className='ai row4'>Total Score: {aiState.totalScore}</div>    
        </div>
    );
};

export default ScoreBoard;