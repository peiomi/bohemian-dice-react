export function getCounts(values) {
    const counts = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 };
    values.forEach(v => counts[v]++);
    return counts;
}

export function scoringCombination(values) {
    if (values.length === 0) return false;
    const c = getCounts(values);

    if (c[1] > 0 || c[5] > 0) return true;

    for (let face = 1; face <= 6; face++) {
        if (c[face] >= 3) return true;
    }

    const has12345 = [1, 2, 3, 4, 5].every(f => c[f] >= 1);
    const has23456 = [2, 3, 4, 5, 6].every(f => c[f] >= 1);
    const has123456 = [1, 2, 3, 4, 5, 6].every(f => c[f] >= 1);

    return has12345 || has23456 || has123456;
}

export function scoreDice(values, gameState) {
    if (values.length === 0) return 0;
    const counts = getCounts(values);
    let score = 0;

    const c = counts;
    const has12345 = [1, 2, 3, 4, 5].every(f => c[f] >= 1);
    const has23456 = [2, 3, 4, 5, 6].every(f => c[f] >= 1);
    const has123456 = [1, 2, 3, 4, 5, 6].every(f => c[f] >= 1);

    if (has123456) {
        score += 1500;
        [1, 2, 3, 4, 5, 6].forEach(f => c[f]--);
    } else if (has12345) {
        score += 500;
        [1, 2, 3, 4, 5].forEach(f => c[f]--);
    } else if (has23456) {
        score += 750;
        [2, 3, 4, 5, 6].forEach(f => c[f]--);
    }

    const baseTriple = { 1:1000, 2:200, 3:300, 4:400, 5:500, 6:600 };

    for (let face = 1; face <= 6; face++) {
        const n = c[face];
        if (n >= 3) {
            const extra = n - 3;
            let tripleScore = baseTriple[face] * Math.pow(2, extra);

            if (gameState?.badge?.name === "Gold Emperor" && face === 1 && n >= 3){
                tripleScore *= 3;
            }
            if (gameState?.badge?.name === "Gold Tyche" && face === 6 && n >= 3) {
                tripleScore *= 2;
            }
            score += tripleScore;
            c[face] = 0;
        }
    }

    score += c[1] * 100;
    score += c[5] * 50;

    if (gameState?.badge) {
        if (gameState.badge.name === "Blue Warlord") {
            score = Math.round(score * 1.25);
        } else if (gameState.badge.name === "Pink Warlord") {
            score = Math.round(score * 1.5);
        } else if (gameState.badge.name === "Gold Warlord") {
            score = score * 2;
        }
    }
    return score;
}
