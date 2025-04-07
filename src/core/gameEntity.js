import {Graphics} from "pixi.js";

export class GameEntity {
    constructor(app) {
        this.app = app;
        this.sprite = new Graphics().rect(0, 0, 50, 50).fill(0xffffff);

        this.start();
        app.ticker.add((ticker) => {
            this.update(ticker);
        });
    }

    drawDebugLines(){
        this.sprite = this.sprite
            .lineTo(50, 0).lineTo(0, 0).stroke(0xff0000)
            .lineTo(0, 50).stroke(0x00ff00);
    }

    start() {

    }

    update(ticker) {

    }
}