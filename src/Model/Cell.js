class Cell {
    constructor(counter) {
	    this.counter = counter || 0;
    }

    tick() {
        this.counter = Math.max(this.counter - 1, 0);
    }

    paint(adapter) { return adapter.GetEmptyCell(); }
    shouldSubstitute() { return false; }
    collide(snake) { return false; }
}

class SnakeCell extends Cell { 
    paint(adapter) { return adapter.GetSnakeCell(); }
    shouldSubstitute() { return this.counter === 0; }
    collide(snake) { 
        snake.hit();
        return true;
    }
}

class FruitCell extends Cell { 
    paint(adapter) { return adapter.GetFruitCell(); }
    shouldSubstitute() { return this.counter === 0; }
    collide(snake) { 
        snake.eat();
        return false;
    }
}

class EmptyCell extends Cell { 
    constructor() {
        super(0);
    }
    tick() { }
    paint(adapter) { return adapter.GetEmptyCell(); }
    shouldSubstitute() { return false; }
    collide(snake) { return false; }
}

class ObstacleCell extends Cell {
    constructor() {
        super(0);
    }
    tick() { }
    paint(adapter) { return adapter.GetObstacleCell(); }
    shouldSubstitute() { return false; }
    collide(snake) { 
        snake.hit(); 
        return true; 
    }
}

module.exports = {
    EmptyCell,
    SnakeCell,
    FruitCell,
    ObstacleCell
}
