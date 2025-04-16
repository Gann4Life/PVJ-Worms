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
        // TODO: Dividing the position between update() and render() will allow a proper behaviour without affectin physics.
        // The graphics will loop over the screen while the world is still simulated out of bounds.

        this.sprite.position.x = this.sprite.position.x % window.innerWidth;
        this.sprite.position.y = this.sprite.position.y % window.innerHeight;
    }
}