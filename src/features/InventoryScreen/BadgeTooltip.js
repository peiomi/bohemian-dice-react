import React from 'react';

const BadgeToolTip = ({ badge }) => {
    const { name, description, rarity } = badge;

    return (
        <div className='tooltip-content'>
            <div className='tooltip-title'>{name}</div>
            <div className='tooltip-divider' />
            {description && <div className='tooltip-text'>{description}</div>}
            {rarity && (
                <>
                    <div className='tooltip-divider' />
                    <div>{rarity}</div>
                </>
            )}
        </div>
    );
};

export default BadgeToolTip;