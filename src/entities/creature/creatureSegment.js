import { GameEntity } from "../../core/gameEntity";
import { GameUtils } from "../../core/utils";
import { Graphics } from "pixi.js";

export class CreatureSegment extends GameEntity {
    constructor(app, segmentParams) {
        super(app);

        /*  Object properties:
        {
            next:
            id:
            controller:
        }
         */
        this.segmentParams = segmentParams;

        this.size = 40;
        this.dynamicSize = this.size - segmentParams.controller.segments.length;

        this.sprite = new Graphics()
            .circle(0, 0, this.dynamicSize, this.dynamicSize)
            .fill(0xab34ba)
            .stroke(0xffaaea);
        this.drawDebugLines();
        this.nextSegment = this.segmentParams.next;
    }

    start(){
        this.debugShape = new Graphics().circle(0, 0, 4).fill(0xffffff);
        this.app.stage.addChild(this.debugShape);
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

        this.debugUpdate();

        let targetPosition = this.nextSegment.connectionPoint();
        let distanceToNextSegment = GameUtils.distanceToVec2Abs(this.sprite.position, targetPosition).magnitude;
        if(distanceToNextSegment > this.dynamicSize){
            this.sprite.position = GameUtils.lerpVec2(this.sprite.position, targetPosition, (distanceToNextSegment - this.dynamicSize) / distanceToNextSegment);
        }

        this.sprite.rotation = GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, targetPosition.x, targetPosition.y);
    }

    connectionPoint() {
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;
        let r = this.dynamicSize;
        let x = pos.x + r * Math.cos(rot + GameUtils.deg2rad(180));
        let y = pos.y + r * Math.sin(rot + GameUtils.deg2rad(180));
        return { x: x, y: y }
    }

    debugUpdate(){
        this.debugShape.position = this.connectionPoint();
    }
}