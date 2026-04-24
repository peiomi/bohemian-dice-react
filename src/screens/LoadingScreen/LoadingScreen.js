import React from 'react';
import Header from '../../components/Header';
import './loading-screen.css';

const LoadingScreen = () => {
    return(
        <div className='loading-screen'>
            <Header text='✾ Bohemian Dice ✾' />
            <div className='loader'>
                <div className='loading-bar'></div>
            </div>

            <div className='loader-text'>Loading...</div>
        </div>
    );
};

export default LoadingScreen;