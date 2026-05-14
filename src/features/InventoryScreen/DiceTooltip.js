import React from 'react';

const DiceTooltip = ({ die }) => {
    const { name, type, probabilities, description } = die;

    return (
        <div className='tooltip-content'>
            <div className='tooltip-title'>{name}</div>
            <div className='tooltip-subtitle'>{type}</div>
            <div className='tooltip-divider' />
            {probabilities && (
                <div className='tooltip-section'>
                    {Object.entries(probabilities).map(([face, prob]) => (
                        <div key={face} className='tooltip-line'>
                            <span>Face {face}:</span>
                            <span>{Math.round(prob * 100)}%</span>
                        </div>
                    ))}
                </div>
            )}
            {description && (
                <>
                    <div className='tooltip-divider' />
                    <div className='tooltip-text'>{description}</div>
                </>
            )}
        </div>
    )
};

export default DiceTooltip;