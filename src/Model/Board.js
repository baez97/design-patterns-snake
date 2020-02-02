import Builder from './Builder';
export default class Board {
    constructor(size, snakeLength) {
        this.builder = new Builder();
        this.initializeCells(size);
        this.builder.buildObjects(this);
        this.doICollideWith = this.doICollideWith.bind(this);
        this.setSnakePosition = this.setSnakePosition.bind(this);
    }

    initializeCells(size) {
        this.cells = [];
        for(let i = 0; i < size; i++) {
            this.cells.push([]);
            for(let j = 0; j < size; j++)
                this.cells[i].push(this.builder.buildEmptyCell());
        }
    }

    moveSnake() {
        this.snake.move(this.doICollideWith, this.setSnakePosition);
    }

    doICollideWith(x, y) {
        var outOfBounds = this.checkOutOfBounds(x, y);
        if ( outOfBounds )
            return true;

        var collideWithCell = this.checkCollideWithCell(this.snake, x, y);
        return collideWithCell;
    }

    setSnakePosition(x, y, length) {
        this.cells[y][x] = this.builder.buildSnakeCell(length);
    }

    checkOutOfBounds(x, y) {
        let lastCell= this.cells.length;
        
        var outHorizontal = x >= lastCell || x < 0;
        var outVertical   = y >= lastCell || y < 0;

        return outHorizontal || outVertical;
    }

    checkCollideWithCell(snake, x, y) {
        var cell = this.cells[y][x];
        return cell.collide(snake);
    }

    tick() {
        for ( let i = 0; i < this.cells.length; i++ )
            for ( let j = 0; j < this.cells[i].length; j++ ) {
                var cell = this.cells[i][j];
                cell.tick();
                if ( cell.shouldSubstitute() )
                    this.cells[i][j] = this.builder.buildEmptyCell();
            }
        
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