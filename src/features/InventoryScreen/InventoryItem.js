import React from "react";
import './inventory.css';
import DiceImage from '../GameScreen/DiceCanvas/DiceImage';


const InventoryItem = ({ type, item, selected, onClick, disabled }) => {
    const isBadge = type === 'badge';

    let rarityClass = '';
    if (isBadge) {
        switch(item.rarity) {
            case 'rare':
                rarityClass = 'rarity-rare';
                break;
            case 'uncommon':
                rarityClass = 'rarity-uncommon';
                break;
            case 'common':
                rarityClass = 'rarity-common';
                break;
            default:
                rarityClass = 'rarity-common';
                break;
        }
    }

    /* const content = type === 'die' ? <DiceTooltip die={item} /> : <BadgeToolTip badge={item} />; */

   return (
        <div
            className={`inventory-item ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${rarityClass}`}
            onClick={!disabled ? onClick : undefined}
        >
            <div /* content={content} */>
                <div className="tooltip-anchor" ref={null}>
                    <div className="inventory-item-inner">
                        {type === 'die' ? (
                            <div className="inventory-icon">
                                <DiceImage
                                    face={item.face || 1}
                                    x={0}
                                    y={0}
                                    size={48}
                                    isAI={false}
                                />
                            </div>
                        ) : (
                            <div className="inventory-icon">
                                {item.icon && (
                                    <img
                                        src={item.icon}
                                        alt={item.name}
                                        className="badge-icon"
                                    />
                                )}
                            </div>
                        )}

                        <div className="inventory-text">
                            <div className="item-name">{item.name}</div>
                            {type === 'die' && item.type && (
                                <div className="item-subtext">{item.type}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryItem;