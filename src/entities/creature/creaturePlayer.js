import {Creature} from "./creature";
import {GameUtils} from "../../core/utils";

export class CreaturePlayer extends Creature {
    constructor(app) {
        super(app);

        this.keysPressed = {};

        // app.canvas.addEventListener('pointermove', (event) => this.onPointerMove(event));
        
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    onPointerMove(event){
        this.desiredPosition = event;
        this.desiredRotation = GameUtils.rad2deg(GameUtils.rotateTowards(this.sprite.position.x, this.sprite.position.y, this.desiredPosition.x, this.desiredPosition.y));
    }

    onKeyDown(event) {
        this.keysPressed[event.key] = true;
    }

    onKeyUp(event) {
        this.keysPressed[event.key] = false;
    }

    update(ticker) {
        super.update(ticker);

        const moveAmount = this.movementSpeed * 10;
        
        if (this.keysPressed['ArrowUp']) {
            this.desiredPosition.y -= moveAmount;
        }
        if (this.keysPressed['ArrowDown']) {
            this.desiredPosition.y += moveAmount;
        }
        if (this.keysPressed['ArrowLeft']) {
            this.desiredPosition.x -= moveAmount;
        }
        if (this.keysPressed['ArrowRight']) {
            this.desiredPosition.x += moveAmount;
        }

        let hasReachedTarget = GameUtils.distanceToVec2(this.sprite.position, this.desiredPosition).magnitude > this.size;

        if (hasReachedTarget) {
            this.desiredRotation = GameUtils.rad2deg(
                GameUtils.rotateTowards(
                    this.sprite.position.x,
                    this.sprite.position.y,
                    this.desiredPosition.x,
                    this.desiredPosition.y
                )
            );
            this.handleRotation();
            this.handleMovement();
        }
    }
}