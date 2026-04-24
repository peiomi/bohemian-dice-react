import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './main-menu.css';
import Header from '../../components/Header';

const MainMenu = () => {
    return (
        <div className='main-menu'>
            <Header className='main-menu-title' text='Bohemian Dice'/>
            <div className='menu-buttons'>
                <Link to='/game' className='menu-button'>
                    <Button text='Start Game' />
                </Link>
                <Link to='/inventory' className='menu-button'>
                    <Button text='Inventory' />
                </Link>
                <Link to='/rules' className='menu-button'>
                    <Button text='Rules' />
                </Link>
            </div>
        </div>
    );
};

export default MainMenu;