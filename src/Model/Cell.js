export default class Cell {
    constructor(counter) {
	    this.counter = counter || 0;
    }

    tick() {
        this.counter = Math.max(this.counter - 1, 0);
    }
}
