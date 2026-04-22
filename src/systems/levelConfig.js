import LEVELS from "../data/LEVELS";

export const getLevelConfig = (levelNum) => {
    return LEVELS.find(l => l.level === levelNum) || null;
};

export const getNextLevel = (currentLevel) => {
    return LEVELS.find(l => l.level === currentLevel + 1) || null;
};

export const isLastLevel = (levelNum) => {
    return levelNum === LEVELS[LEVELS.length - 1].level;
};