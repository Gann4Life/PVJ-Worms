import { Application } from "pixi.js";
import { CreaturePlayer } from "./entities/creature/creaturePlayer";
import { CreatureBot } from "./entities/creature/creatureBot";
import {Food} from "./entities/food";

export class GameManager {
    constructor(){
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
        let player = new CreaturePlayer(this.app);
        this.gameEntities.push(player);
    }

    createBots(){
        for(let i = 0; i < 4; i++){
            let bot = new CreatureBot(this.app, this.gameEntities);
            this.gameEntities.push(bot);
        }
    }

    createFood(){
        for(let i = 0; i < 40; i++){
            let food = new Food(this.app);
            this.gameEntities.push(food);
        }
    }
}