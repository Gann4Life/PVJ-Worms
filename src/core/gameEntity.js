export class GameEntity {
    constructor(app) {
        app.ticker.add((ticker) => {
            this.update(ticker);
        })
        this.start();
    }

    start() {

    }

    update(ticker) {

    }
}