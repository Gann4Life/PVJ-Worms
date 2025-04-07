import {GameEntity} from "../../core/gameEntity";
import { GameUtils } from "../../core/utils";
import {Graphics} from "pixi.js";

export class CreatureSegment extends GameEntity {
    constructor(app, nextSegment) {
        super(app);
        this.sprite = new Graphics()
            .circle(0, 0, 40, 40)
            .fill(0xab34ba);
        this.drawDebugLines();
        this.nextSegment = nextSegment;
    }

    update(ticker){
        // let distX = this.nextSegment.sprite.position.x - this.sprite.position.x;
        // let distY = this.nextSegment.sprite.position.y - this.sprite.position.y;
        //
        // if(Math.abs(distX) > 50 || Math.abs(distY) > 50)
        // {
        //     this.sprite.position.x += distX / 4;
        //     this.sprite.position.y += distY / 4;
        // }

        let distanceToNextSegment = GameUtils.distanceToVec2Abs(this.sprite.position, this.nextSegment.sprite.position).magnitude;
        if(distanceToNextSegment > 40){
            this.sprite.position = GameUtils.lerpVec2(this.sprite.position, this.nextSegment.sprite.position, 0.25);
        }

        this.sprite.rotation = GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, this.nextSegment.sprite.position.x, this.nextSegment.sprite.position.y);
    }
}