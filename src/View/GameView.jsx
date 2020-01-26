import React from 'react';
import BoardView from './BoardView';

const SIZE = 10;
const SNAKE_LENGTH = 5;

export default class GameView extends React.Component {
    render = () => (
        <div id="main">
            <BoardView size={SIZE} snakeLength={SNAKE_LENGTH}/>
        </div> 
    )
}