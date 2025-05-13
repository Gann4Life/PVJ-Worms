import {Graphics, TilingSprite, Assets} from "pixi.js";

export class GameEntity {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.position = { x: 0, y: 0 };
        this.sprite = new Graphics().rect(0, 0, 50, 50).fill(0xffffff);

        // Load and create background
        this.background = null;
        this.loadBackground();

        this.start();
    }

    async loadBackground() {
        // const texture = await Assets.load('tile-dirt.jpg');

        // Create a TilingSprite as background
        this.background = new TilingSprite({
            texture: await Assets.load('images/tile-dirt.jpg'),
            width: this.gameManager.app.screen.width,
            height: this.gameManager.app.screen.height
        });

        // Add background to the stage (behind everything)
        this.gameManager.app.stage.addChildAt(this.background, 0);
    }

    drawDebugLines(){
        this.sprite = this.sprite
            .lineTo(50, 0).lineTo(0, 0).stroke(0xff0000)
            .lineTo(0, 50).stroke(0x00ff00);
    }

    start() {

    }

    update(ticker) {
        // if (this.background) {
        //     this.background.tilePosition.x -= 0.5 * ticker.deltaTime;
        //     this.background.tilePosition.y -= 0.25 * ticker.deltaTime;
        // }
    }

    render() {
        this.sprite.position = this.position;
        // this.sprite.position.x = this.position.x % this.app.canvas.width;
        // this.sprite.position.y = this.position.y % this.app.canvas.height;
    }
}