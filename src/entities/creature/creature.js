import { Graphics } from "pixi.js";
import {GameEntity} from "../../core/gameEntity";
import { CreatureSegment } from "./creatureSegment";
import {GameUtils} from "../../core/utils";

export class Creature extends GameEntity {
    constructor(app) {
        super(app);

        let randomPos = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
        let zeroPos = {x: 0, y: 0};

        this.desiredRotation = 0;
        this.desiredPosition = randomPos;
        this.sprite = new Graphics().circle(0, 0, 50).fill(0xffffff);
        this.sprite.position = randomPos;
        this.drawDebugLines();
        this.createSegments();
        app.canvas.addEventListener('pointermove', (event) => this.onPointerMove(event));
    }

    createSegments() {
        this.segments = [];
        let lastSegment = this;
        for(let i = 0; i < 20; i++){
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
    }

    update(ticker){
        super.update(ticker);
        // this.desiredPosition = GameUtils.lerpVec2(
        //     this.desiredPosition,
        //     { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
        //     0.01
        // );
        let debugP = document.getElementById("debug-text");

        let dynamicMotion = (Math.sin((this.sprite.position.x + this.sprite.position.y) / 64) * 15)
        this.sprite.angle = this.desiredRotation + dynamicMotion;
        debugP.innerText = `\ndesired angle: ${this.desiredRotation}, \ncurrent angle: ${this.sprite.angle}`;


        if(GameUtils.distanceToVec2(this.sprite.position, this.desiredPosition).magnitude > 50) {
            // this.sprite.position = GameUtils.lerpVec2(this.sprite.position, this.desiredPosition, 0.01);
            // this.sprite.position.x += this.rightDirection().x * (dynamicMotion/5);
            // this.sprite.position.y += this.rightDirection().y * (dynamicMotion/5);
            this.sprite.position = GameUtils.lerpVec2(this.sprite.position, this.forwardDirection(), 0.1);
        }
    }

    onPointerMove(event){
        this.desiredPosition = event;
        this.desiredRotation = GameUtils.rad2deg(GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, this.desiredPosition.x, this.desiredPosition.y));
    }

    connectionPoint() {
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;
        let r = 50;
        let x = pos.x + r * Math.cos(rot + GameUtils.deg2rad(180));
        let y = pos.y + r * Math.sin(rot + GameUtils.deg2rad(180));
        return { x: x, y: y }
    }

    forwardDirection() {
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;
        let r = 50;
        let x = pos.x + r * Math.cos(rot);
        let y = pos.y + r * Math.sin(rot);
        return { x: x, y: y }
    }

    rightDirection(){
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;
        let r = 1;
        let x = r * Math.cos(rot + GameUtils.deg2rad(90));
        let y = r * Math.sin(rot + GameUtils.deg2rad(90));
        return { x: x, y: y }
    }
}