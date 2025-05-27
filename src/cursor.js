import { Graphics } from "pixi.js";

export class Cursor {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.clicking = false;
        this.initialClick = { x: 0, y: 0 };
        this.endClick = { x: 0, y: 0 };
        this.graphic = new Graphics();
        this.gameManager.app.stage.addChild(this.graphic);

        this.lastSelection = {};

        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);

        window.addEventListener("pointerdown", this.onPointerDown);
        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerDown(event) {
        this.initialClick = { x: event.clientX, y: event.clientY };
        this.clicking = true;
    }

    onPointerMove(event) {
        if (this.clicking) {
            const startX = this.initialClick.x;
            const startY = this.initialClick.y;
            const currentX = event.clientX;
            const currentY = event.clientY;

            const x = Math.min(startX, currentX);
            const y = Math.min(startY, currentY);
            const w = Math.abs(currentX - startX);
            const h = Math.abs(currentY - startY);

            this.graphic.clear();
            this.graphic.rect(x, y, w, h).stroke(0xffffff);
        }
    }

    onPointerUp(event) {
        this.endClick = { x: event.clientX, y: event.clientY };
        this.clicking = false;
        this.graphic.clear();

        this.lastSelection = this.selectEntities(this.initialClick, this.endClick);
        this.gameManager.gameEntities.forEach((entity) => { entity.setSelected(false) });
        this.lastSelection.forEach((entity) => {
            if(entity.isSelectable)
                entity.setSelected(true);
        });
    }

    /**
     * Selects entities inside the rectangle defined by two screen-space points.
     * Works with PIXI.DisplayObject or plain {x, y} entities.
     * @param {{x: number, y: number}} start
     * @param {{x: number, y: number}} end
     * @returns {Array} selected entities
     */
    selectEntities(start, end) {
        const x1 = Math.min(start.x, end.x);
        const y1 = Math.min(start.y, end.y);
        const x2 = Math.max(start.x, end.x);
        const y2 = Math.max(start.y, end.y);

        return this.gameManager.gameEntities.filter(entity => {
            return (entity.position.x >= x1 && entity.position.x <= x2 && entity.position.y >= y1 && entity.position.y <= y2);
        });
    }
}
