import React from 'react';
import Board from '../Model/Board';
import ViewAdapter from './ViewAdapter';

export default class BoardView extends React.Component {
    constructor(props) {
        super(props);
        var { size, snakeLength } = props;
        this.board = new Board(size, snakeLength);
        this.viewAdapter = new ViewAdapter();
        this.state = {
            cells: this.board.cells
        }
        this.keyMethods = {
            ArrowUp    : () => this.board.startMovingUp(),
            ArrowDown  : () => this.board.startMovingDown(),
            ArrowLeft  : () => this.board.startMovingLeft(),
            ArrowRight : () => this.board.startMovingRight()
        }
        document.onkeydown = (event) => this.keyPressed(event);
    }

    keyPressed(event) {
        var movementMethod = this.keyMethods[event.key];
        if ( movementMethod === undefined )
            return; 
        movementMethod();
    }

    tick() {
        this.board.tick();
        this.setState({cells: this.board.cells});
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 500);
    }

    render() {
        var matrix = this.state.cells.map(row => {
            var rowView = row.map(cell => cell.paint(this.viewAdapter))
            return <div>{ rowView }</div>
        });

        return (
            <div id="board">
                { matrix }
            </div>
        )
    }
}