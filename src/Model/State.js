class State {
    move(snake, doICollideWith, setPosition) { 
        var { newX, newY } = this.computeNewPosition(snake); 
        if ( !doICollideWith(newX, newY) ) {
            setPosition(newX, newY, snake.length);
            snake.x = newX;
            snake.y = newY;
        }
    }

    computeNewPosition(snake) { return { newX: 0, newY: 0 }; }
}

class MovingUp extends State {
    computeNewPosition(snake) {
        var { posX, posY } = snake.getPosition();
        var newX = posX;
        var newY = posY - 1;
        return { newX, newY };
    }
}

class MovingDown extends State {
    computeNewPosition(snake) {
        var { posX, posY } = snake.getPosition();
        var newX = posX;
        var newY = posY + 1;
        return { newX, newY };
    }
}

class MovingRight extends State {
    computeNewPosition(snake) {
        var { posX, posY } = snake.getPosition();
        var newX = posX + 1;
        var newY = posY;
        return { newX, newY };
    }
}

class MovingLeft extends State {
    computeNewPosition(snake) {
        var { posX, posY } = snake.getPosition();
        var newX = posX - 1;
        var newY = posY;
        return { newX, newY };
    }
}

module.exports = { MovingUp, MovingDown, MovingLeft, MovingRight }