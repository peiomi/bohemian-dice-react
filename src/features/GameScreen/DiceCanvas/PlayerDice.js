import { useEffect, useRef } from 'react';
import { useDiceSprites } from '../../../utils/diceSprites';
import { drawDieFrame, animateRoll } from '../../../utils/diceRendering';
import DiceHitbox from './DiceHitbox';

const PlayerDice = ({ x, y, size, face, onClick, rolling, held, onRollComplete, removed }) => {
    const canvasRef = useRef(null);
    const sprites = useDiceSprites();

    useEffect(() => {
        if (!sprites.loaded) return;

        const ctx = canvasRef.current.getContext("2d");

        if (rolling) {
            animateRoll(
                ctx,
                sprites.playerSheet,
                0,
                0,
                size,
                face,
                sprites.frameWidth,
                sprites.frameHeight,
                onRollComplete
            );
        } else {
            drawDieFrame(
                ctx,
                sprites.playerSheet,
                face - 1,
                0,
                0,
                size,
                0,
                sprites.frameWidth,
                sprites.frameHeight
            );
        }
    }, [sprites, face, rolling]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                style={{ position: 'absolute', left: x, top: y }}
                className={`player-die ${held ? 'kept' : ''} ${removed ? 'removed' : ''}`}
            />
            <DiceHitbox x={x} y={y} size={size} onClick={onClick} />
        </>
    );
};

export default PlayerDice;