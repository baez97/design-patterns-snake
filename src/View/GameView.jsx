import React from 'react';
import BoardView from './BoardView';
import './GameStyles.css';

const SIZE = 10;
const SNAKE_LENGTH = 5;

export default class GameView extends React.Component {
    render = () => (
        <div id="main-container">
            <BoardView size={SIZE} snakeLength={SNAKE_LENGTH}/>
        </div> 
    )
}