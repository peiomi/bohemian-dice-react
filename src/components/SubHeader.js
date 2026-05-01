import React from 'react';

const SubHeader = ({ text, className }) => {
    return (
        <h2 className={className}>{text}</h2>
    );
};

export default SubHeader;