class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.entities = [];
        this.player = new Player(50, 50);
        this.entities.push(this.player);

        // Spawn initial enemie(s)
        this.spawnEnemies(1);
    }

    // Add an entity to the game
    addEntity(entity) {
        this.entities.push(entity);
    }

    // Update game state
    update() {
        // Update entities
        this.entities.forEach((entity) => {
            if (entity.update) {
                // Pass the player instance to the update method
                entity.update(this.player, this.entities);
            }
        });

        // Check for collisions between an entity and projectiles
        for (const entity of this.entities) {
            // Replace this condition with the appropriate check for your specific entity (e.g., enemy)
            if (entity instanceof Enemy) {
                for (const projectile of this.entities) {
                    // Replace this condition with the appropriate check for your specific projectile
                    if (projectile instanceof Projectile) {
                        if (hasCollision(entity, projectile)) {
                            // Handle collision (e.g., remove both entities or decrease their health)
                        }
                    }

                }
            }
        }
    }

    // Render game scene
    render() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Set the background color
        this.ctx.fillStyle = CONSTANTS.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render each entity
        this.entities.forEach(entity => {
            if (entity.render) {
                entity.render(this.ctx);
            }
        });
    }

    // Spawn enemies
    spawnEnemies(count) {
        for (let i = 0; i < count; i++) {
            // Set random positions and properties for the enemies
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;

            const enemy = new Enemy(x, y);
            this.entities.push(enemy);
        }
    }
}