import {GameEntity} from "./gameEntity";
import {Graphics} from "pixi.js";
import {GameUtils} from "./utils";

export class PhysicsEntity extends GameEntity {
    constructor(app, gameManager){
        super(app);
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.acceleration = { x: 0, y: 0 };
        this.friction = 0.98;
        this.mass = 10;
        this.bounceFactor = 0.5;

        this.gameManager = gameManager;
    }

    addForce(force){
        // Directly modify acceleration
        this.acceleration.x += force.x / this.mass;
        this.acceleration.y += force.y / this.mass;
    }

    update(ticker) {
        // Update velocity from acceleration
        this.velocity.x += this.acceleration.x * ticker.deltaTime;
        this.velocity.y += this.acceleration.y * ticker.deltaTime;

        // Apply friction
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;

        // Update position from velocity
        this.position.x += this.velocity.x * ticker.deltaTime;
        this.position.y += this.velocity.y * ticker.deltaTime;

        // Reset acceleration for next frame
        this.acceleration.x = 0;
        this.acceleration.y = 0;

        this.addForce(this.gameManager.gravity);
        this.bounce();
        this.render();
    }

    render(){
        this.sprite.position = this.position;
    }

    bounce(){
        if(this.position.y > this.gameManager.app.canvas.height){
            this.position.y = this.gameManager.app.canvas.height;
            this.velocity.y *= -this.bounceFactor;
        }
    }
}