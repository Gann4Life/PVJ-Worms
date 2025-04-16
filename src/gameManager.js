import { Application } from "pixi.js";
import { CreaturePlayer } from "./entities/creature/creaturePlayer";
import { CreatureBot } from "./entities/creature/creatureBot";
import {Food} from "./entities/food";

export class GameManager {
    constructor(){
        this.gravity = { x: 0, y: 0 };
        this.wind = { x: 0, y: 0 };
        this.gameEntities = [];
        this.app = new Application();
        this.setupApp().then(r => this.onAppInitialized());
    }

    async setupApp() {
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.app.canvas.style.position = "absolute";
        document.body.appendChild(this.app.canvas);
    }

    onAppInitialized() {
        this.setupAllEntities();
        this.app.ticker.add(() => {
            this.gameLoop();
        });
    }

    gameLoop(){
        for(let i = 0; i < this.gameEntities.length; i++) {
            this.gameEntities[i].update(this.app.ticker);
        }
        for(let i = 0; i < this.gameEntities.length; i++){
            this.gameEntities[i].render();
        }
    }

    setupAllEntities(){
        this.createPlayer();
        this.createBots();
        this.createFood();

        // Adds created entities to the stage.
        for(let i = 0; i < this.gameEntities.length; i++){
            const entity = this.gameEntities[i];
            this.app.stage.addChild(entity.sprite);
        }
    }

    createPlayer(){
        let player = new CreaturePlayer(this);
        player.segments.forEach(i => { this.gameEntities.push(i); });
    }

    createBots(){
        for(let i = 0; i < 4; i++){
            let bot = new CreatureBot(this);
            bot.segments.forEach(i => {
                this.gameEntities.push(i);
            });
        }
    }

    createFood(){
        for(let i = 0; i < 40; i++){
            let food = new Food(this);
            this.gameEntities.push(food);
        }
    }
}