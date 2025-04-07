import { Application, Graphics } from 'pixi.js';
import { ExampleEntity } from './entities/exampleEntiy.js';
import {Creature} from "./entities/creature/creature";

(async() => {
    const app = new Application();

    await app.init({
        width: window.innerWidth,
        height: window.innerHeight
    });

    app.canvas.style.position = 'absolute';

    // const rectangle = new Graphics();
    // rectangle.rect(200, 200, 50, 50);
    // rectangle.fill({
    //     color: 0xffae00,
    // });

    // app.stage.addChild(rectangle);

    let ent = new Creature(app);
    app.stage.addChild(ent.sprite);

    document.body.appendChild(app.canvas);
})();