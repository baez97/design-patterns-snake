import React from 'react';
import Board from '../Model/Board';

export default class BoardView extends React.Component {
    constructor(props) {
        super(props);
        var { size, snakeLength } = props;
        this.board = new Board(size, snakeLength);
        this.state = {
            cells: this.board.cells
        }

        document.onkeydown = () => this.keyPressed();
    }

    keyPressed() {
        this.board.tick();
        this.setState({cells: this.board.cells});
    }

    render() {
        var matrix = this.state.cells.map(row => {
            var row = row.map(cell => <a>{cell.counter} </a>)
            return <div>{ row }</div>
        });

        return (
            <div>
                { matrix }
            </div>
        )
    }
}