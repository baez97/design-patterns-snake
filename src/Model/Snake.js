export default class Snake {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length || 3;
    }

    eat() {
	    this.length++;
    }

    hit() {
	    this.length = Math.max(this.lenght - 1, 0);
    }
}
