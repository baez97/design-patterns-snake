export default class Snake {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length || 3;
    }

    getPosition() {
        return { posX:this.x, posY:this.y };
    }

    eat() {
	    this.length++;
    }

    hit() {
	    this.length = Math.max(this.lenght - 1, 0);
    }

    move(setPositionFn) {
        this.y = Math.max(this.y -1, 0);
        setPositionFn(this.x, this.y);
    }
}
