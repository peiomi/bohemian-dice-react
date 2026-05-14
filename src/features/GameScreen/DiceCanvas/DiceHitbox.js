import React from 'react';
import '../game-screen.css';

const DiceHitbox = ({ x, y, size, onClick }) => {
    return (
        <div className='hitbox'
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
                cursor: 'pointer',
            }}
            onClick={onClick}
        />
    );
};

export default DiceHitbox;