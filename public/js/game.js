class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.entities = [];
    }

    // Add an entity to the game
    addEntity(entity) {
        this.entities.push(entity);
    }

    // Update game state
    update() {
        this.entities.forEach(entity => {
            if (entity.update) {
                entity.update();
            }
        });
    }

    // Render game scene
    render() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render each entity
        this.entities.forEach(entity => {
            if (entity.render) {
                entity.render(this.ctx);
            }
        });
    }
}