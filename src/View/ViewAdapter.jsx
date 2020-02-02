import React from 'react';
import './GameStyles.css';

export default class ViewAdapter {
    GetEmptyCell() {
        return <div className="cell emptyCell"></div>
    }

    GetSnakeCell() {
        return <div className="cell snakeCell"></div>
    }

    GetObstacleCell() {
        return <div className="cell obstacleCell"></div>
    }

    GetFruitCell() {
        return <div className="cell fruitCell"></div>
    }
}