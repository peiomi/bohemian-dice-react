// remember useRef() to create an instance 

import { normalDie } from "../data/DICE-LIST";

export default class Player {
    constructor(name) {
        this.name = name;
        this.inventory = {
            dice: Array(6).fill(normalDie),
            badges: []
        };
        this.unlockedLevels = 1;
    }

    addDie(die) {
        this.inventory.dice.push(die);
    }

    addBadge(badge) {
        this.inventory.badges.push(badge);
    }

    removeBadge(badgeName) {
        this.inventory.badges = this.badges.filter(b => b.name !== badgeName);
    }

    setLoadout(dice, badge) {
        this.loadout = { dice, badge };
    }

}