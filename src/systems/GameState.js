// should only track turn-by-turn gameplay NOT global app data
// gameStateRef.current.startTurn();

export default class GameState {
    constructor(isAI = false) {
        this.isAI = isAI;
        this.dice = [];
        this.turnScore = 0;
        this.totalScore = 0;
        this.badge = null;
        this.busted = false;
    }

    startTurn() {
        this.turnScore = 0;
        this.busted = false;

        this.dice.forEach(d => {
            d.kept = false;
            d.removed = false;
            d.value = null;
        });
    }

    applyScore(points) {
        this.turnScore += points;
        this.totalScore += points;
    }

    bust() {
        this.turnScore = 0;
        this.busted = true;
    }

    setBadge(badge) {
        this.badge = badge;
    }

    setDice(diceArray) {
        this.dice = diceArray.map(d => ({
            ...d,
            kept: false,
            removed: false,
            value: null
        }));
    }
}