// remember useRef() to create an instance 

import { normalDie } from "../data/DICE-LIST";

export default class Player {
    constructor(name) {
        this.name = name;
        this.inventory = {
            dice: [normalDie, normalDie, normalDie, normalDie, normalDie, normalDie],
            badges: []
        };
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