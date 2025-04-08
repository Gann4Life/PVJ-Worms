import { Application, Graphics } from 'pixi.js';
import { ExampleEntity } from './entities/exampleEntiy.js';
import {Creature} from "./entities/creature/creature";
import {CreaturePlayer} from "./entities/creature/creaturePlayer";
import {CreatureBot} from "./entities/creature/creatureBot";

(async() => {
    const app = new Application();

    await app.init({
        width: window.innerWidth,
        height: window.innerHeight
    });

    app.canvas.style.position = 'absolute';

    const gameEntities = [];

    let player = new CreaturePlayer(app);
    gameEntities.push(player);

    for(let i = 0; i < 4; i++){
        let bot = new CreatureBot(app);
        gameEntities.push(bot);
    }

    for(let i = 0; i < gameEntities.length; i++){
        const entity = gameEntities[i];
        app.stage.addChild(entity.sprite);
    }

    document.body.appendChild(app.canvas);
})();