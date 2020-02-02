import React from 'react';
import BoardView from './BoardView';
import './GameStyles.css';

const SIZE = 10;
const SNAKE_LENGTH = 5;

export default class GameView extends React.Component {
    state = { paused: false };
    pause = () => { 
        this.setState((prevState) => ({ paused: !prevState.paused })); 
    }

    render = () => (
        <div id="main-container">
            <BoardView size={SIZE} snakeLength={SNAKE_LENGTH} paused={this.state.paused}/>
            <button onClick={this.pause}>Pause</button>
        </div> 
    )
}