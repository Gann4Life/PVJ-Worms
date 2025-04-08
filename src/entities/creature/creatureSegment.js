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
        this.size = segmentParams.controller.segmentSize(segmentParams.id);
        this.sprite = new Graphics()
            .circle(0, 0, this.size)
            .fill(0xab34ba)
            .stroke(0xffaaea);
        this.drawDebugLines();
        this.nextSegment = this.segmentParams.next;
    }

    adjustSize(){
        let prevPos = this.sprite.position;
        let prevR = this.sprite.rotation;

        this.size = this.segmentParams.controller.segmentSize(this.segmentParams.id);

        this.app.stage.removeChild(this.sprite);

        this.sprite = new Graphics()
            .circle(0, 0, this.size)
            .fill(0xab34ba)
            .stroke(0xffaaea);
        this.sprite.position = prevPos;
        this.sprite.rotation = prevR;

        this.sprite.eventMode = "static";
        this.sprite.cursor = "pointer";
        this.sprite.on('pointerdown', () => {
            this.segmentParams.controller.splitSegmentAtIndex(this.segmentParams.id);
        });

        this.app.stage.addChild(this.sprite);
    }

    eat(predator) {
        console.log("eating");
        predator.addNewSegment();
        this.segmentParams.controller.splitSegmentAtIndex(this.segmentParams.id);
        this.app.stage.removeChild(this.sprite);
        let i = this.segmentParams.controller.world.indexOf(this);
        this.segmentParams.controller.world.slice(i);
    }

    start(){
        this.debugShape = new Graphics().circle(0, 0, 4).fill(0xffffff);
        this.app.stage.addChild(this.debugShape);
    }

    update(ticker){
        if(this.nextSegment === undefined) return;
        super.update(ticker);
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
        if(distanceToNextSegment > this.size){
            this.sprite.position = GameUtils.lerpVec2(this.sprite.position, targetPosition, (distanceToNextSegment - this.size) / distanceToNextSegment);
        }

        this.sprite.rotation = GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, targetPosition.x, targetPosition.y);
    }

    connectionPoint() {
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;
        let target = GameUtils.pointAroundCircle(rot, this.size, 180);
        return GameUtils.sumVec2(pos, target);
    }

    debugUpdate(){
        // this.debugShape.position =
    }
}