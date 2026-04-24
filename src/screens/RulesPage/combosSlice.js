import  COMBOS  from '../../data/COMBOS';

export const selectAllCombos = () => {
    return COMBOS;
};

export const selectCombosByIds = (ids) => {
    return COMBOS.filter((c) => ids.includes(c.pointCombo));
};

