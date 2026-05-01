import React from 'react';
import AIDice from './AiDice';
import PlayerDice from './PlayerDice';

const DiceArea = ({ 
    name,
    type,
    dice = [],
    rolling = [],
    onDieClick = () => {},
    size = 64,
    startX = 20,
    startY = 20,
    gap = 10
}) => {
    return (
        <div style={{ position: "relative", height: size + 40 }}>
            <div style={{ marginBottom: 8, fontWeight: "bold" }}>
                {name}'s Dice
            </div>

            {dice.map((die, i) => {
                const x = startX + i * (size + gap);
                const y = startY;

                const rolling = die.value === null;
                const face = die.value ?? 1;

                if (type === "ai") {
                    return (
                        <AIDice
                            key={i}
                            x={x}
                            y={y}
                            size={size}
                            face={face}
                            rolling={rolling[i]}
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
                        rolling={rolling}
                        held={die.kept}
                        onClick={() => onDieClick(i)}
                        onRollComplete={() => {}}
                    />
                );
            })}
        </div>
    );
};

export default DiceArea;

