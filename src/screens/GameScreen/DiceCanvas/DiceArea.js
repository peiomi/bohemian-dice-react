import React from 'react';
import AIDice from './AiDice';
import PlayerDice from './PlayerDice';
import SubHeader from '../../../components/Header';
import '../game-screen.css';

const DiceArea = ({ 
    name,
    type,
    dice = [],
    onDieClick = () => {},
    size = 64,
    startX = 20,
    startY = 20,
    gap = 10
}) => {
    return (
        <div>
            <SubHeader className='name-header' text={`${name}'s Dice`} />
            <div className='dice-container'>

                {dice.map((die, i) => {
                    const x = startX + i * (size + gap);
                    const y = startY;

                    const face = die.value ?? 1;

                    if (type === "ai") {
                        return (
                            <AIDice
                                key={i}
                                x={x}
                                y={y}
                                size={size}
                                face={face}
                                rolling={die.rolling}
                                onRollComplete={() => {}}
                            />
                        );
                    }

                    return (
                        <PlayerDice
                            key={i}
                            x={x}
                            y={y}
                            size={size}
                            face={face}
                            rolling={die.rolling}
                            held={die.kept}
                            onClick={() => onDieClick(i)}
                            onRollComplete={() => {}}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default DiceArea;

