import { useEffect, useRef } from "react";
import { useDiceSprites } from "../../../utils/diceSprites";
import { drawDieFrame } from "../../../utils/diceRendering";

const DiceImage = ({ face, x, y, size, isAI = false }) => {
    const canvasRef = useRef(null);
    const sprites = useDiceSprites();

    useEffect(() => {
        if (!sprites.loaded) return;

        const ctx = canvasRef.current.getContext('2d');
        const sprite = isAI ? sprites.aiSheet : sprites.playerSheet;

        drawDieFrame(
            ctx,
            sprite,
            face - 1,
            0,
            0,
            size,
            0,
            sprites.frameWidth,
            sprites.frameHeight
        );
    }, [sprites, face, size, isAI]);
    return (
        <canvas
            ref={canvasRef}
            width={size}
            height={size}
            style={{ position: 'absolute', left: x, top: y }}
        />
    );
};

export default DiceImage;