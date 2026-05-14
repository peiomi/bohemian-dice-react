import React from 'react';
import { selectCombosByIds } from './combosSlice';
import pip1 from "../../app/assets/side_1_pip.png";
import pip2 from "../../app/assets/side_2_pips.png";
import pip3 from "../../app/assets/side_3_pips.png";
import pip4 from "../../app/assets/side_4_pips.png";
import pip5 from "../../app/assets/side_5_pips.png";
import pip6 from "../../app/assets/side_6_pips.png";
import { Col } from 'reactstrap';

const pipImgs = {
    1: pip1,
    2: pip2,
    3: pip3,
    4: pip4,
    5: pip5,
    6: pip6
};

const ComboDisplay = ({ ids }) => {
    return (
        <div className='combo-grid'>
            {selectCombosByIds(ids).map(combo => (
                <div key={combo.pointCombo} className='combo-cell'>
                    <div className='combo-dice'>
                        {combo.dice.map((pip, i) => (
                        <img 
                            key={i}
                            src={pipImgs[pip]}
                            width={50}
                            height={50}
                            alt={`pip ${pip}`}
                        />
                    ))}
                    </div>
                    <div className='combo-score'>
                        = {combo.score}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ComboDisplay;