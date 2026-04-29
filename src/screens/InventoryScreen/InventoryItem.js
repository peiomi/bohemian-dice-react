import React from "react";
import './inventory.css';

const InventoryItem = ({ type, item, selected, onClick, disabled }) => {
    return (
        <div 
            className={`inventory-item ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`} 
            onClick={!disabled ? onClick : undefined}
        >
            <div className='item-name'>{item.name}</div>
        </div>
    );
};

export default InventoryItem;