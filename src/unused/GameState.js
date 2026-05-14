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
            if (!d.removed) {
                d.kept = false;
                d.value = null;
            }
        });
    }

    newTurn() {
        this.turnScore = 0;
        this.busted = false;

        this.dice.forEach(d => {
            d.kept = false;
            d.removed = false;
            d.value = null;
            d.rolling = false;
        });
    }

    applyScore(points) {
        this.turnScore += points;
        // totalScore is updated at end of turn, not here
    }

    bust() {
        this.turnScore = 0;
        this.busted = true;
    }

    setBadge(badge) {
        this.badge = badge;
    }

    setDice(diceArray) {
        this.dice = diceArray.map(d => {
            const dieInstance = d && typeof d.roll === 'function' ? d : d?.die;
            return {
                ...d,
                die: dieInstance,
                kept: false,
                removed: false,
                value: null,
                rolling: false
            };
        });
    }
}