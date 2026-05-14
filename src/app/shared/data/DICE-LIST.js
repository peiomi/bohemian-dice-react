import Dice from '../../../utils/Dice';

export const normalDie = new Dice('Normal Die', [.1667, .1667, .1667, .1667, .1667, .1667]);
export const arankasDie = new Dice(`Adam's Die`, [.286, .048, .286, .048, .286, .048]);
export const cheatersDie = new Dice(`Cautious Cheater's Die`, [.238, .143, .095, .143, .238, .143]);
export const ciDie = new Dice(`Ci`, [.143, .143, .143, .143, .143, .286]);
export const devilsDie = new Dice(`Devil's Head`, [.1667, .1667, .1667, .1667, .1667, .1667]);
export const misfortuneDie = new Dice(`Die of Misfortune`, [.046, .227, .227, .227, .227, .046]);
export const evenDie = new Dice(`Even Die`, [.067, .267, .067, .267, .067, .267]);
export const favorableDie = new Dice(`Favorable Die`, [.333, 0, .056, .056, .333, .222]);
export const greasyDie = new Dice(`Greasy Die`, [.177, .118, .177, .118, .177, .235]);
export const grimyDie = new Dice(`Grimy Die`, [.063, .313, .063, .063, .438, .063]);
export const genzDie = new Dice(`GenZ Luck`, [.067, .667, .067, .067, .067, .067]);
export const heavenlyDie = new Dice(`Heavenly`, [.368, .105, .105, .105, .105, .211]);
export const trinityDie = new Dice(`Holy Trinity`, [.211, .263, .368, .053, .053, .053]);
export const kingsDie = new Dice(`King's Die`, [.125, .188, .219, .25, .125, .094]);
export const gamblersDie = new Dice(`Lousy Gambler's Die`, [.1, .15, .1, .35, .15, .15]);
export const luckyDie = new Dice(`Lucky Die`, [.273, .046, .091, .136, .182, .273]);
export const mathDie = new Dice(`Mathmetician's Die`, [.167, .208, .25, .292, .042, .042]);
export const monksDie = new Dice(`Monk's Die`, [.4, .4, .05, .05, .05, .05]);
export const pearlDie = new Dice(`Mother of Pearl`, [.25, .083, .083, .083, .25, .25]);
export const oddDie = new Dice(`Odd Die`, [.267, .067, .267, .067, .267, .067]);
export const weightedDie = new Dice(`Weighted Die`, [.667, .067, .067, .067, .067, .067]);

export const diceList = [
    normalDie, arankasDie, cheatersDie, ciDie, devilsDie, misfortuneDie,
    evenDie, favorableDie, greasyDie, grimyDie, genzDie, heavenlyDie,
    trinityDie, kingsDie, gamblersDie, luckyDie, mathDie, monksDie,
    pearlDie, oddDie, weightedDie
];