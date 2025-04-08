import {Creature} from "./creature";
import {GameUtils} from "../../core/utils";

export class CreatureBot extends Creature {
    constructor(app, world) {
        super(app, world);
        this.setRandomDesiredPosition();
    }

    update(ticker){
        super.update(ticker);

        let closestEntity = this.closestEatableSegment();

        this.desiredRotation = GameUtils.rad2deg(GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, this.desiredPosition.x, this.desiredPosition.y));

        let distanceToTarget = GameUtils.distanceToVec2Abs(this.sprite.position, this.desiredPosition);
        this.desiredPosition = closestEntity.sprite.position;

        // if(distanceToTarget < this.size * 4 && closestEntity.size > this.size){
        //     this.desiredPosition = {
        //         x: closestEntity.connectionPoint().x * 8,
        //         y: closestEntity.connectionPoint().y * 8
        //     }
        // }
        if(distanceToTarget.magnitude < this.size){
            closestEntity.eat(this);
        }

        // if(distanceToTarget.magnitude < this.size){
        //     this.setRandomDesiredPosition();
        // }
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

    closestEntity(){
        return this.closest(this.world);
    }

    smallestEntity() {
        return this.smallest(this.world);
    }

    closestSegment(){
        return this.closest(this.closestEntity().segments);

        // TODO: Find entities within a range rather than globally and simplify the search using that.
        // let result;
        // let distanceToResult;
        // for(let i = 0; i < this.world.length; i++){
        //     let entity = this.world[i];
        //     for(let s = 0; i < entity.segments.length; s++){
        //         let segment = entity.segments[s];
        //         if(!segment) break;
        //         let distanceToEntity = GameUtils.distanceToVec2Abs(this.sprite.position, segment.sprite.position).magnitude;
        //         let entityIsMine = this.segments.some(seg => seg === segment);
        //         if(!entityIsMine && (distanceToEntity < distanceToResult || distanceToResult === undefined))
        //         {
        //             result = segment;
        //             distanceToResult = distanceToEntity;
        //         }
        //     }
        // }
        // return result;
    }

    closestEatableSegment() {
        return this.closest(this.smallest(this.closest(this.world).segments));
    }
}