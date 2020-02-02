class Cell {
    constructor(counter) {
	    this.counter = counter || 0;
    }

    tick() {
        this.counter = Math.max(this.counter - 1, 0);
    }

    paint(adapter) { return adapter.GetEmptyCell(); }
}

class SnakeCell extends Cell { 
    paint(adapter) { return adapter.GetSnakeCell(); }
}

class FruitCell extends Cell { 
    paint(adapter) { return adapter.GetFruitCell(); }
}

class EmptyCell extends Cell { 
    constructor() {
        super(0);
    }
    tick() { }
    paint(adapter) { return adapter.GetEmptyCell(); }

}
class ObstacleCell extends Cell {
    constructor() {
        super(0);
    }
    tick() { }
    paint(adapter) { return adapter.GetObstacleCell(); }
}

module.exports = {
    EmptyCell,
    SnakeCell,
    FruitCell,
    ObstacleCell
}
