export const getBadgeUses = (badge) => {
    if (!badge) return 0;

    const levelUses = {
        blue: 1,
        pink: 2, 
        gold: 3
    };

    if (badge.name.includes("Doppelganger") ||
        badge.name.includes("Might") ||
        badge.name.includes("Resurrection")) {
        return levelUses[badge.level] || 1;
    }

    if (badge.name.includes("Executioner's Advantage")) {
        return 10;
    }

    return 1;
};

export const applyHeadstart = (state, badge) => {
    if (!badge) return;

    if (badge.name.includes("Headstart")) {
        const bonus = {
            blue: 200,
            pink: 500,
            gold: 1000
        };
        state.totalScore += bonus[badge.level] || 0;
    }
    
};

export const applyScoreMultiplier = (score, badge) => {
    if (!badge) return score;

    if (badge.name.includes("Warlord")) {
        const multiplier = {
            blue: 1.5,
            pink: 2,
            gold: 3
        };
        return Math.floor(score * (multiplier[badge.level] || 1));
    }

    return score;
};

export const applyMightBonus = (score, badge) => {
    if (!badge) return score;

    if (badge.name.includes("Might")) {
        const bonus = {
            blue: 50,
            pink: 100,
            gold: 200
        };
        return score + (bonus[badge.level] || 0);
    }

    return score;
};

export const applyResurrect = (state, badge, badgeState) => {
    if (!badge || !badge.name.includes("Resurrection")) return false;

    if (badgeState.usesLeft > 0) {
        badgeState.usesLeft -= 1;
        return true;
    }

    return false;
};

export const applyTransmutation = (dice, badge, targetDieId) => {
    if (!badge || !badge.name.includes("Transmutation")) return dice;

    return dice.map(die => {
        if (die.id !== targetDieId) return die;
        let newValue = die.value;

        if (badge.level === "blue") newValue = 3;
        else if (badge.level === "pink") newValue = 5;
        else if (badge.level === "gold") newValue = 1;
        return { ...die, value: newValue };
    });
};

/* export const applyJoker = (dice, badge) => {
    if (!badge || !badge.name.includes("Joker")) return dice;

}; */