import React, { useState } from 'react';
import { Col, Row, Container } from 'reactstrap';
import './rules-page.css';
import BADGES from '../../data/BADGES';
import RulesSection from './RulesSection';
import Subheader from '../../components/SubHeader';
import Header from '../../components/Header';
import ComboGrid from './ComboGrid';
import ComboGrid3x2 from './ComboGrid3x2';


const RulesPage = () => {
    return(
        <Container>
            <Header text='Rules' />
            <RulesSection 
                header='Basic Rules'
                text={`If you have nothing in your inventory you play with normal dice and zero badges.
                You gain dice and badges by playing, if you win you have a chance to win higher 
                level dice and badges.`} 
            /> 
            <RulesSection 
                header='Choosing Dice:'
                text={`If you have any dice in your inventory, you can choose to use them before
                starting the game. Each dice has a unique special property to improve your luck.`} 
            />
            <RulesSection 
                header='Course of the game:'
                text={`You start the game by rolling all six dice. Select the scoring dice you want to keep 
                (put them to the side and gain points for them at the end of your turn), then roll the rest again. 
                You can keep rolling until you run out of dice. 
                However, if you don't roll a single scoring die, you lose all points gained this turn. 
                You are trying to finish your turn and score as many points as you can before you run 
                the risk of not rolling a single scoring die. The first player to reach the score goal is the victor.`} 
            />
            <Subheader text='Point Combo Scoring' />
            <ComboGrid
                leftIds={['1x1', '5x1', '1-5', '2-6', '1-6']}
                rightIds={['1x3', '2x3', '3x3', '4x3', '5x3', '6x3']}
            />
            <h3>Each additional die after 3 matching doubles the value: </h3>
            <ComboGrid3x2
                groups={[
                    ['1x4', '1x5', '1x6'],
                    ['2x4', '2x5', '2x6'],
                    ['3x4', '3x5', '3x6'],
                    ['4x4', '4x5', '4x6'],
                    ['5x4', '5x5', '5x6'],
                    ['6x4', '6x5', '6x6']
                ]}
            />
            
              
        </Container>
    );
};

export default RulesPage;