import Cell from './Cell';
import Builder from './Builder';
export default class Board {
    constructor(size, snakeLength) {
        this.builder = new Builder();
        this.initializeCells(size);
        this.builder.buildObjects(this);
    }

    initializeCells(size) {
        this.cells = [];
        for(let i = 0; i < size; i++) {
            this.cells.push([]);
            for(let j = 0; j < size; j++)
                this.cells[i].push(new Cell());
        }
    }

    moveSnake() {
        this.snake.move((x, y) => this.setSnakePosition(x,y));
    }

    setSnakePosition(x, y) {
        if ( this.checkCollision(x, y) ) {
            this.snake.hit();
            return;
        }
        this.cells[y][x] = new Cell(this.snake.length);
        this.snake.x = x;
        this.snake.y = y;
    }

    checkCollision(x, y) {
        let lastCell= this.cells.length;
        
        var outHorizontal = x >= lastCell || x < 0;
        var outVertical   = y >= lastCell || y < 0;

        return outHorizontal || outVertical;
    }

    tick() {
        this.cells.forEach(row => 
            row.forEach( cell => 
                cell.tick()));
        
        this.moveSnake();
    }

    startMovingUp() {
        this.snake.startMovingUp()
    }
    startMovingDown() {
        this.snake.startMovingDown()
    }
    startMovingRight() {
        this.snake.startMovingRight()
    }
    startMovingLeft() {
        this.snake.startMovingLeft()
    }
}