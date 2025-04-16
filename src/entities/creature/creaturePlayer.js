import {Creature} from "./creature";
import {GameUtils} from "../../core/utils";

export class CreaturePlayer extends Creature {
    constructor(gameManager) {
        super(gameManager);
        gameManager.app.canvas.addEventListener('pointermove', (event) => this.onPointerMove(event));
    }

    onPointerMove(event){
        this.desiredPosition = event;
        this.desiredRotation = GameUtils.rad2deg(GameUtils.rotateTowards(this.position.x, this.position.y, this.desiredPosition.x, this.desiredPosition.y));
    }
}