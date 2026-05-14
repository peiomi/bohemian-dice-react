export const drawDieFrame = (ctx, sprite, frameIndex, 
    x, y, size, row = 0, frameWidth, frameHeight) => {
    const sx = frameIndex * frameWidth;
    const sy = row * frameHeight;

    ctx.drawImage(sprite, sx, sy, frameWidth, frameHeight, x, y, size, size);
};

export const animateRoll = (ctx, sprite, x, y, size, 
    finalFace, frameWidth, frameHeight, callback) => {
    const start = performance.now();
    const duration = 500;

    const frame = () => {
        const now = performance.now();
        const progress = now - start;

        ctx.clearRect(x, y, size, size);
        const frameIndex = Math.floor(Math.random() * 6);

        drawDieFrame(ctx, sprite, frameIndex, x, y, size, 5, frameWidth, frameHeight);

        if (progress < duration) {
            requestAnimationFrame(frame);
        } else {
            ctx.clearRect(x, y, size, size);
            drawDieFrame(ctx, sprite, finalFace - 1, x, y, size, 0, frameWidth, frameHeight);
            callback?.();
        }
    }
    frame();
};