import Cell from './Cell';
import Snake from './Snake';

export default class Board {
    constructor(size, snakeLength) {
        this.initializeCells(size);
        this.initializeSnake(size, snakeLength);
    }

    initializeCells(size) {
        this.cells = [];
        for(let i = 0; i < size; i++) {
            this.cells.push([]);
            for(let j = 0; j < size; j++)
                this.cells[i].push(new Cell());
        }
    }

    initializeSnake(size, snakeLength) {
        this.snake = new Snake(size-1, size-1, snakeLength);
        var { posX, posY } = this.snake.getPosition();
        this.cells[posY][posX] = new Cell(this.snake.length);
    }

    moveSnake() {
        this.snake.move((x, y) => this.setSnakePosition(x,y));
    }

    setSnakePosition(x, y) {
        this.cells[y][x] = new Cell(this.snake.length);
    }

    tick() {
        this.cells.forEach(row => 
            row.forEach( cell => 
                cell.tick()));
        
        this.moveSnake();
    }
}