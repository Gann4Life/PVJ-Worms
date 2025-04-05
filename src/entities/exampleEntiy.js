import {Graphics} from "pixi.js";
import { GameEntity } from '../core/gameEntity.js';

export class ExampleEntity extends GameEntity {
    constructor(app) {
        super(app);

        this.sprite = new Graphics();
        this.sprite.rect(200, 200, 50, 50);
        this.sprite.fill({
            color: 0xffae00
        });

        app.stage.addChild(this.sprite);
    }

    start(){
        super.start();
    }

    update(ticker) {
        let deltaTime = ticker.deltaTime;
        this.sprite.position.x += deltaTime;
    }
}