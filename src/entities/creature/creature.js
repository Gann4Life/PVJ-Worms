import { Graphics } from "pixi.js";
import { GameEntity } from "../../core/gameEntity";
import { CreatureSegment } from "./creatureSegment";
import { GameUtils } from "../../core/utils";

export class Creature extends GameEntity {
    constructor(app) {
        super(app);

        let randomPos = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
        let zeroPos = {x: 0, y: 0};

        this.segments = [this];

        this.size = 20 + Math.random() * 20; // default 40
        this.movementSpeed = 2 / this.size;
        this.desiredRotation = 0;
        this.desiredPosition = randomPos;
        this.sprite = new Graphics().circle(0, 0, this.size).fill(0xffffff);
        this.sprite.position = randomPos;
        this.drawDebugLines();
        this.createSegments();

        this.sprite.eventMode = "static";
        this.sprite.cursor = "pointer";
        this.sprite.on('pointerdown', () => this.addNewSegment());
    }

    createSegments() {
        for(let i = 0; i < 10; i++){
            this.addNewSegment();
        }
    }

    addNewSegment(){
        let lastSegment = this.segments[this.segments.length - 1];
        let params = {
            next: lastSegment,
            id: this.segments.length,
            controller: this
        };
        let newSegment = new CreatureSegment(this.app, params);
        this.segments.push(newSegment);
        this.app.stage.addChild(newSegment.sprite);

        this.adjustSegmentSizes();
    }

    adjustSegmentSizes(){
        for(let i = 1; i < this.segments.length; i++){
            let segment = this.segments[i];
            segment.adjustSize();
        }
    }

    /**
     * Defines the size based on a segment id, which considers the head size and overall segments count.
     * @param id
     * @returns {number}
     */
    segmentSize(id) {
        // return this.size - this.segments.length;
        // return (this.segments.length / id);
        // return this.size * (0.5 + Math.cos((id / this.segments.length * 4)));
        return this.size - this.size * (id / this.segments.length)
    }

    splitSegmentAtIndex(id){
        let segment = this.segments[id];
        segment.nextSegment = undefined;
        this.segments = this.segments.slice(0, id);
        this.adjustSegmentSizes();
    }

    start(){
    }

    update(ticker) {
        super.update(ticker);

        let hasReachedTarget = GameUtils.distanceToVec2(this.sprite.position, this.desiredPosition).magnitude > this.size;

        if(hasReachedTarget) {
            this.handleRotation();
            this.handleMovement();
        }
    }

    // handleRotation() {
    //     let angleDifference = GameUtils.degDiff(this.sprite.angle, this.desiredRotation);
    //     let dynamicMotion = (Math.sin((performance.now()) / (this.size * 8)) * 15);
    //     this.sprite.angle += GameUtils.lerp(0, GameUtils.clamp(angleDifference + dynamicMotion, -30, 30), 0.1);
    // }

    handleRotation() {
        const angleDiff = GameUtils.degDiff(this.sprite.angle, this.desiredRotation);
    
        const rotationSpeed = 4;
        const rotationStep = GameUtils.clamp(angleDiff, -rotationSpeed, rotationSpeed);
    
        this.sprite.angle += rotationStep;
    }

    handleMovement() {
        this.sprite.position = GameUtils.lerpVec2(this.sprite.position, this.forwardDirection(), this.movementSpeed);
    }

    connectionPoint() {
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;

        let target = GameUtils.pointAroundCircle(rot, this.size, 180);
        return GameUtils.sumVec2(pos, target);
    }

    forwardDirection() {
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;
        let target = GameUtils.pointAroundCircle(rot, this.size);
        return GameUtils.sumVec2(pos, target);
    }

    rightDirection(){
        let pos = this.sprite.position;
        let rot = this.sprite.rotation;
        // let r = 1;
        // let x = r * Math.cos(rot + GameUtils.deg2rad(90));
        // let y = r * Math.sin(rot + GameUtils.deg2rad(90));
        // return { x: x, y: y }

        let target = GameUtils.pointAroundCircle(rot, this.size, 90);
        return GameUtils.sumVec2(pos, target);
    }
}