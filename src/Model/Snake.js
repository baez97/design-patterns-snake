import { MovingUp, MovingLeft, MovingRight, MovingDown } from './State';

export default class Snake {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length || 3;
        this.state = new MovingUp();
    }

    getPosition() {
        return { posX:this.x, posY:this.y };
    }

    eat() {
	    this.length++;
    }

    hit() {
        var decrease = this.length - 1;
        this.length = Math.max(decrease, 0);
    }

    move(setPositionFn) {
        this.state.move(this, setPositionFn);
    }

    startMovingUp() {
        this.state = new MovingUp();
    }
    startMovingDown() {
        this.state = new MovingDown();
    }
    startMovingRight() {
        this.state = new MovingRight();
    }
    startMovingLeft() {
        this.state = new MovingLeft();
    }
}
