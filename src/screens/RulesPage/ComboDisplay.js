import React from 'react';
import { selectCombosByIds } from './combosSlice';
import pip1 from "../../assets/side_1_pip.png";
import pip2 from "../../assets/side_2_pips.png";
import pip3 from "../../assets/side_3_pips.png";
import pip4 from "../../assets/side_4_pips.png";
import pip5 from "../../assets/side_5_pips.png";
import pip6 from "../../assets/side_6_pips.png";
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
        <>
            {selectCombosByIds(ids).map(combo => (
                <div key={combo.pointCombo} className='combo'>
                    {combo.dice.map((pip, i) => (
                        <img 
                            key={i}
                            src={pipImgs[pip]}
                            width={50}
                            height={50}
                            alt={`pip ${pip}`}
                        />
                    ))}
                    <p> - {combo.score}</p>
                </div>
            ))}
        </>
    );
};

export default ComboDisplay;