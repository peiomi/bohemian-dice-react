import React from "react";

const InventoryItem = ({ type, item, selected, onClick, disabled }) => {
    return (
        <div 
            className={`inventory-item ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`} 
            onClick={!disabled ? onClick : undefined}
        >
            <p>{type === 'die' ? item.name : item.label}</p>
        </div>
    );
};

export default InventoryItem;