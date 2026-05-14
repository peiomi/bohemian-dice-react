import { useEffect, useState } from "react";

const DICE_FRAMES = 6;
const DICE_ROWS = 6;

export const useDiceSprites = () => {
    const [sprites, setSprites] = useState({
        playerSheet: null,
        aiSheet: null,
        faceWidth: 0,
        faceHeight: 0,
        frameWidth: 0,
        frameHeight: 0,
        loaded: false
    });

    useEffect(() => {
        const playerSheet = new Image();
        const aiSheet = new Image();

        playerSheet.src = '/dice-imgs/CuteDice/PixelDice_White.png';
        aiSheet.src = '../dice-imgs/CuteDice/PixelDice_Pink.png';
        let playerLoaded = false;
        let aiLoaded = false;

        const tryFinalize = () => {
            if (playerLoaded && aiLoaded) {
                const frameWidth = playerSheet.width / DICE_FRAMES;
                const frameHeight = playerSheet.height / DICE_ROWS;

                setSprites({
                    playerSheet,
                    aiSheet,
                    frameWidth,
                    frameHeight,
                    loaded: true
                });
            }
        };

        playerSheet.onload = () => {
            playerLoaded = true;
            tryFinalize();
        };
        aiSheet.onload = () => {
            aiLoaded = true;
            tryFinalize();
        };
    }, []);

    return sprites;

};