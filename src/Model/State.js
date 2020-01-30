class State {
    move(snake, setPositionFunction) { }
}

class MovingUp extends State {
    move(snake, setPositionFunction) {
        var { posX, posY } = snake.getPosition();
        var newY = posY - 1;
        setPositionFunction(posX, newY);
    }
}

class MovingDown extends State {
    move(snake, setPositionFunction) {
        var { posX, posY } = snake.getPosition();
        var newY = posY + 1;
        setPositionFunction(posX, newY);
    }
}

class MovingRight extends State {
    move(snake, setPositionFunction) {
        var { posX, posY } = snake.getPosition();
        var newX = posX + 1;
        setPositionFunction(newX, posY);
    }
}

class MovingLeft extends State {
    move(snake, setPositionFunction) {
        var { posX, posY } = snake.getPosition();
        var newX = posX - 1;
        setPositionFunction(newX, posY);
    }
}

module.exports = { MovingUp, MovingDown, MovingLeft, MovingRight }