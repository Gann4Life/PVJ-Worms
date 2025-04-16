import {GameEntity} from "../core/gameEntity";
import {Graphics} from "pixi.js";

export class Food extends GameEntity {
    constructor(app){
        super(app);

        this.sprite = new Graphics().circle(0, 0, 10).fill(0xffab23);

        let randomPos = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
        this.sprite.position = randomPos;
    }
}