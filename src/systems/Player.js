// remember useRef() to create an instance 

export default class Player {
    constructor(name) {
        this.name = name;
        this.dice = [];
        this.badges = []
    }

    addDie(die) {
        this.dice.push(die);
    }

    addBadge(badge) {
        this.badges.push(badge);
    }

    removeBadge(badgeName) {
        this.badges = this.badges.filter(b => b.name !== badgeName);
    }

}