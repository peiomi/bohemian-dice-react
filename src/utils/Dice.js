export default class Dice {
    constructor(name, probabilities = [1, 1, 1, 1, 1, 1]) {
        this.name = name;
        this.probabilities = [];
        this.setProbabilities(probabilities);
    }

    setProbabilities(probabilities) {
        try {
            if (!Array.isArray(probabilities) || probabilities.length !== 6) {
                throw new Error("probabilities must be an array of 6 numbers");
            }

            const numeric = probabilities.map(p => Number(p));
            if (numeric.some(p => Number.isNaN(p) || p < 0)) {
                throw new Error("probabilities must be non-negative numbers");
            }

            const total = numeric.reduce((sum, p) => sum + p, 0);
            if (total <= 0) {
                throw new Error("sum of probabilities must be greater than 0");
            }

            this.probabilities = numeric.map(p => p / total);
        } catch (e) {
            console.log(e.message);
        }
    }

    roll() {
        const r = Math.random();
        let cumulative = 0;

        for (let i = 0; i < 6; i++) {
            cumulative += this.probabilities[i];
            if (r < cumulative) {
                return i + 1;
            }
        }
        return 6;
    }

    getProbabilities() {
        return [...this.probabilities];
    }
}