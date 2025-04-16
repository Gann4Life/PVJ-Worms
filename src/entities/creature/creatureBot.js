import {Creature} from "./creature";
import {GameUtils} from "../../core/utils";
import {Graphics} from "pixi.js";

export class CreatureBot extends Creature {
    constructor(app, world) {
        super(app, world);
        this.setRandomDesiredPosition();
    }

    drawDebugLines() {
        super.drawDebugLines();

        this.g = new Graphics();
        this.app.stage.addChild(this.g);
    }

    update(ticker) {
        super.update(ticker);
        let distanceToTarget = GameUtils.distanceToVec2Abs(this.sprite.position, this.desiredPosition);
        let closestEntity = this.closestSegment();
        let targetReached = distanceToTarget.magnitude < this.size * 2;
        this.desiredRotation = GameUtils.rad2deg(GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, this.desiredPosition.x, this.desiredPosition.y));

        // Keep distance from target
        if(targetReached)
        {
            this.setRandomDesiredPosition();
        }
        // if(distanceToTarget < this.size * 4 && closestEntity.size > this.size){
        //     this.desiredPosition = {
        //         x: closestEntity.connectionPoint().x * 8,
        //         y: closestEntity.connectionPoint().y * 8
        //     }
        // }
        // if(distanceToTarget.magnitude < this.size){
        //     closestEntity.eat(this);
        // }

        // Debug line that displays where the creatures are trying to move towards
        this.g.position = this.sprite.position;
        this.g.clear();
        let drawPoint = GameUtils.diffVec2(this.desiredPosition, this.sprite.position);
        this.g.lineTo(drawPoint.x, drawPoint.y).stroke(0xff0000);

    }

    setRandomDesiredPosition() {
        this.desiredPosition = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        }
    }

    closest(entities){
        let result;
        let distanceToResult;
        for(let i = 0; i < entities.length; i++){
            let entity = entities[i];
            let distanceToEntity = GameUtils.distanceToVec2Abs(this.sprite.position, entity.sprite.position).magnitude;
            let entityIsMine = this.segments.some(segment => segment === entity);
            if(!entityIsMine && (distanceToEntity < distanceToResult || distanceToResult === undefined))
            {
                result = entity;
                distanceToResult = distanceToEntity;
            }
        }
        return result;
    }

    smallest(entities) {
        let result = [];

        for(let i = 0; i < entities.length; i++){
            let entity = entities[i];
            let entityIsMine = this.segments.some(segment => segment === entity);
            if(!entityIsMine && entity.size < this.size )
                result.push(entity);
        }
        return result.sort((a, b) => { return  b - a});
    }

    closestEntity(range = 500){
        return this.closest(this.getWithinRange(this.world, range));
    }

    smallestEntity() {
        return this.smallest(this.world);
    }

    closestSegment(range = 500){
        try {

            let segments = this.closestEntity().segments;
            if(segments){
                return this.closest(segments, range);
            }
        } catch(e){
            console.error(e);
        }
    }

    closestEatableSegment() {
        return this.closest(this.smallest(this.closest(this.world).segments));
    }

    /**
     * Checks if an individual entity is within range.
     * @param entity
     * @param range
     * @returns {{x: *|number, y: *|number, magnitude: *|number}}
     */
    isWithinRange(entity, range) {
        return GameUtils.distanceToVec2Abs(this.sprite.position, entity.sprite.position).magnitude < range;
    }

    /**
     * From the given entities, filters the ones that are within the designed area.
     * @param entities
     * @param range
     * @returns {*}
     */
    getWithinRange(entities, range) {
        return entities.filter(e => this.isWithinRange(e, range))
    }

    /**
     * [] Find within range
     * [] Find closest within range
     * [] ??
     * [] ??
     */

    // TODO: World sensor class?

}