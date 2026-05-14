import React, { useState } from 'react';
import InventoryItem from "./InventoryItem";
import Button from '../../components/Button';
import SubHeader from '../../components/SubHeader';
import { useParams, useNavigate } from 'react-router-dom';


const InventoryScreen = ({ player, onLoadoutSelected }) => {
    const navigate = useNavigate();
    const { mode } = useParams();

    const [selectedDiceIndex, setSelectedDiceIndex] = useState([]);
    const [selectedBadgeIndex, setSelectedBadgeIndex] = useState(null);
    const isLoadoutMode = mode === 'loadout';

    const handleSelectDie = (index) => {
        if (!isLoadoutMode) return;
        if (selectedDiceIndex.includes(index)) {
            setSelectedDiceIndex(selectedDiceIndex.filter((i) => i !== index));
        } else if (selectedDiceIndex.length < 6) {
            setSelectedDiceIndex([...selectedDiceIndex, index]);
        }
    };

    const handleSelectBadge = (index) => {
        if (!isLoadoutMode) return;
        setSelectedBadgeIndex(index);
    }; 

    const handleConfirm = () => {
        if (!isLoadoutMode) return;
        if (selectedDiceIndex.length !== 6) {
            alert('Select 6 Dice');
            return;
        }
        const selectedDice = selectedDiceIndex.map((i) => player.inventory.dice[i]);
        const selectedBadge = selectedBadgeIndex != null ? player.inventory.badges[selectedBadgeIndex] : null;

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
                        selected={selectedDiceIndex.includes(index)}
                        onClick={() => handleSelectDie(index)}
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
                        selected={selectedBadgeIndex === index}
                        onClick={() => handleSelectBadge(index)}
                        disabled={!isLoadoutMode}
                    />
                ))}
            </div>

            {isLoadoutMode && <Button text='Confirm Loadout' onClick={handleConfirm} />}
        </div>
    );
};

export default InventoryScreen;