import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // need this instead of Link to run logic before navigating
import { selectLevels } from './levelsSlice';
import Button from '../../components/Button';
import SubHeader from '../../components/SubHeader';
import './level-select.css';


const LevelSelectScreen = ({ player, onSelectLevel }) => {
    const navigate = useNavigate();
    const levels = useSelector(selectLevels);

    if (!player) return null;

    const handleSelect = (levelObj) => {
        if (levelObj.level > player.unlockedLevels) {
            alert("This level is locked, play the previous level first.");
            return;
        }

        onSelectLevel(levelObj);
        navigate('/inventory/loadout');
    };

    return (
        <div className='level-select-screen'>
            <SubHeader text='Select a Level' className='level-header' />
            <div className='level-grid'>
                {levels.map((lvl) => (
                    <Button
                        key={lvl.level}
                        className='level-button'
                        text={
                            lvl.level <= player.unlockedLevels ?
                                `Level ${lvl.level} - Goal: ${lvl.goal}` : `Level ${lvl.level} - LOCKED`
                        }
                        disabled={lvl.level > player.unlockedLevels}
                        onClick={() => handleSelect(lvl)}
                    />
                ))}
            </div>
        </div>
    );
};

export default LevelSelectScreen;