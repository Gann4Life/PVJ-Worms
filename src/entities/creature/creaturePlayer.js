import {Creature} from "./creature";
import {GameUtils} from "../../core/utils";

export class CreaturePlayer extends Creature {
    constructor(gameManager) {
        super(gameManager);

        this.keysPressed = [];

        window.addEventListener('keydown', (event) => this.onKeyDown(event));
        window.addEventListener('keyup', (event) => this.onKeyUp(event));
        // window.addEventListener('pointerdown', (event) => console.log(event));
    }

    onKeyDown(event) {
        this.keysPressed[event.key] = true;
    }

    onKeyUp(event) {
        this.keysPressed[event.key] = false;
    }

    onKeyPressed(event) {
        let movementInput = 0; // Inputs del jugador
        let positionToMove = this.desiredPosition + movementInput;

        this.desiredPosition = positionToMove;
    }

    update(ticker) {
        let left = this.keysPressed["ArrowLeft"] ? -1 : 0;
        let right = this.keysPressed["ArrowRight"] ? 1 : 0;
        let up = this.keysPressed["ArrowUp"] ? -1 : 0;
        let down = this.keysPressed["ArrowDown"] ? 1 : 0;
        
        if(left === 0 && right === 0 && up === 0 && down === 0) return;
        super.update(ticker);

        let dirToMoveX = left + right;
        let dirToMoveY = up + down;
        let dirToMove = { x: dirToMoveX * this.size * 2, y: dirToMoveY * this.size * 2 };

        this.desiredPosition = GameUtils.sumVec2(this.position, dirToMove);

        // this.desiredPosition.x += dirToMove.x;
        // this.desiredPosition.y += dirToMove.y;
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