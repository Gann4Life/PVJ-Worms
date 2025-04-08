import {Creature} from "./creature";
import {GameUtils} from "../../core/utils";

export class CreatureBot extends Creature {
    constructor(app) {
        super(app);
        this.setRandomDesiredPosition();
    }

    update(ticker){
        super.update(ticker);

        this.desiredRotation = GameUtils.rad2deg(GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, this.desiredPosition.x, this.desiredPosition.y));
        let distanceToTarget = GameUtils.distanceToVec2Abs(this.sprite.position, this.desiredPosition);
        if(distanceToTarget.magnitude < this.size){
            this.setRandomDesiredPosition();
        }
    }

    setRandomDesiredPosition() {
        this.desiredPosition = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        }
    }
}