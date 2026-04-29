import React, { useState } from 'react';
import InventoryItem from "./InventoryItem";
import Button from '../../components/Button';
import SubHeader from '../../components/SubHeader';
import { useParams, useNavigate } from 'react-router-dom';


const InventoryScreen = ({ player, onLoadoutSelected }) => {
    const navigate = useNavigate();
    const { mode } = useParams();

    const [selectedDice, setSelectedDice] = useState([]);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const isLoadoutMode = mode === 'loadout';

    const handleSelectDie = (die) => {
        if (!isLoadoutMode) return;
        if (selectedDice.includes(die)) {
            setSelectedDice(selectedDice.filter( d => d !== die));
        } else if (selectedDice.length < 6) {
            setSelectedDice([...selectedDice, die]);
        }
    };

    const handleSelectBadge = (badge) => {
        if (!isLoadoutMode) return;
        setSelectedBadge(badge);
    }; 

    const handleConfirm = () => {
        if (!isLoadoutMode) return;
        if (selectedDice.length !== 6) {
            alert('Select 6 Dice');
            return;
        }

        onLoadoutSelected(selectedDice, selectedBadge);
        navigate('/game');
    };

    return(
        <div className='inventory-screen'>
            <SubHeader text={isLoadoutMode ? "Choose Your Loadout" : "Your Inventory"} />

            <h2>Dice</h2>
            <div className='dice-grid'>
                {player.inventory.dice.map((die, index) => (
                    <InventoryItem 
                        key={index}
                        type='die'
                        item={die}
                        selected={selectedDice.includes(die)}
                        onClick={() => handleSelectDie(die)}
                        disabled={!isLoadoutMode}
                    />
                ))}
            </div>

            <h2>Badges</h2>
            <div className='badge-grid'>
                {player.inventory.badges.map((badge, index) => (
                    <InventoryItem
                        key={index} 
                        type='badge'
                        item={badge}
                        selected={selectedBadge === badge}
                        onClick={() => handleSelectBadge(badge)}
                        disabled={!isLoadoutMode}
                    />
                ))}
            </div>

            {isLoadoutMode && <Button text='Confirm Loadout' onClick={handleConfirm} />}
        </div>
    );
};

export default InventoryScreen;