import { Application, Graphics } from 'pixi.js';

(async() => {
    const app = new Application();

    await app.init({
        width: window.innerWidth,
        height: window.innerHeight
    });

    app.canvas.style.position = 'absolute';

    const rectangle = new Graphics();
    rectangle.rect(200, 200, 50, 50);
    rectangle.fill({
        color: 0xffae00,
    });

    app.stage.addChild(rectangle);

    document.body.appendChild(app.canvas);
})();