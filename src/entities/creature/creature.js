import { Graphics } from "pixi.js";
import {GameEntity} from "../../core/gameEntity";
import { CreatureSegment } from "./creatureSegment";
import {GameUtils} from "../../core/utils";

export class Creature extends GameEntity {
    constructor(app) {
        super(app);
        this.desiredPosition = {x: 0, y: 0};
        this.sprite = new Graphics().circle(0, 0, 50).fill(0xffffff);
        this.drawDebugLines();
        this.createSegments();
        app.canvas.addEventListener('pointermove', (event) => this.onPointerMove(event));
    }

    createSegments() {
        this.segments = [];
        let lastSegment = this;
        for(let i = 0; i < 29; i++){
            let segment = new CreatureSegment(this.app, lastSegment);
            this.segments.push(segment);
            this.app.stage.addChild(segment.sprite);
            lastSegment = segment;
        }
    }

    start(){

    }

    update(ticker){
        this.sprite.rotation = GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, this.desiredPosition.x, this.desiredPosition.y);

        if(GameUtils.distanceToVec2(this.sprite.position, this.desiredPosition).magnitude > 50) {
            // this.sprite.position.x = event.x;
            // this.sprite.position.y = event.y;
            this.sprite.position = GameUtils.lerpVec2(this.sprite.position, this.desiredPosition, 0.1);
        }
    }

    onPointerMove(event){
        this.desiredPosition = event;
    }
}