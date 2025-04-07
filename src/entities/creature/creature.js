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
        app.canvas.addEventListener('pointerdown', (event) => this.onPointerMove(event));
    }

    createSegments() {
        this.segments = [];
        let lastSegment = this;
        for(let i = 0; i < 29; i++){
            let params = {
                next: lastSegment,
                id: i,
                controller: this
            }
            let segment = new CreatureSegment(this.app, params);
            this.segments.push(segment);
            this.app.stage.addChild(segment.sprite);
            lastSegment = segment;
        }
    }

    start(){
        this.desiredPosition = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
    }

    update(ticker){
        // this.desiredPosition = GameUtils.lerpVec2(
        //     this.desiredPosition,
        //     { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
        //     0.01
        // );

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

    connectionPoint() {
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;
        let r = 50;
        let x = pos.x + r * Math.cos(rot + GameUtils.deg2rad(180));
        let y = pos.y + r * Math.sin(rot + GameUtils.deg2rad(180));
        return { x: x, y: y }
    }
}