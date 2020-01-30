import Snake from './Snake';
import Cell from './Cell';

export default class Builder {
    nOfObstacles  = 5;
    nOfFruits     = 5;
    initialLength = 5;

    buildObjects(board) {
        board.snake = this.buildInitialSnake(board.cells);
        this.buildInitialObstacles(board.cells);
        this.buildInitialFruits(board.cells);
    }

    buildInitialSnake(cells) {
        var lastCell = cells.length - 1;
        var snake = this.buildSnake(lastCell, lastCell);
        var snakeCell = this.buildCell(snake.length);
        cells[lastCell][lastCell] = snakeCell;
        return snake;
    }

    buildInitialObstacles(cells) {
        for ( let i = 0; i < this.nOfObstacles; i++ ) {
            var randX = this.randomNumber(0, cells.length);
            var randY = this.randomNumber(0, cells.length);
            if ( cells[randY][randX].counter ===  0)
                cells[randY][randX] = this.buildCell(8);
        }
    }

    buildInitialFruits(cells) {
        for ( let i = 0; i < this.nOfFruits; i++ ) {
            var randX = this.randomNumber(0, cells.length);
            var randY = this.randomNumber(0, cells.length);
            if ( cells[randY][randX].counter ===  0)
                cells[randY][randX] = this.buildCell(9);
        }
    }

    buildSnake(x, y) {
        return new Snake(x, y, this.initialLength)
    }

    buildCell(counter) {
        return new Cell(counter);
    }

    randomNumber(min, max) {
        return Math.floor(Math.random()*max - min);
    }
}