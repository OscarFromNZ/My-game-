class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.entities = [];
        this.player = new Player(50, 50);
        this.entities.push(this.player);

        this.gameLoopInterval = null;

        // Spawn initial enemie(s)
        this.spawnEnemies(1);
    }

    // Add an entity to the game
    addEntity(entity) {
        this.entities.push(entity);
    }

    // Start the game loop
    startGameLoop() {
        // Set up the game loop
        this.gameLoopInterval = setInterval(() => {
            this.update();
            this.render();
        }, 1000 / CONSTANTS.FPS);
    }

    // Update game state
    update() {
        // If the game has ended, stop updating
        if (this.gameLoopInterval === null) {
            return;
        }

        console.log('Before filtering: ', this.entities.filter(entity => entity instanceof Enemy).length);


        // Update entities and filter out dead enemies
        this.entities = this.entities.filter((entity) => {
            if (entity instanceof Enemy || entity instanceof Player) {
                entity.update(this.player, this.entities);
            } else if (entity instanceof Projectile) {
                entity.update(this.player, this.entities);
            } else if (entity.update) {
                entity.update(this.player, this.entities);
            }

            // If the entity is an instance of the Enemy class and it's dead, remove it from the entities array
            if (entity instanceof Enemy && entity.isDead()) {
                // Handle any additional enemy death logic here (e.g., increase score, play sound, etc.)
                console.log("ENEMY: Enemy is dead");

                return false;
            }

            // If the entity is a projectile and shouldBeRemoved is true, remove it from the entities array
            if (entity instanceof Projectile && entity.shouldBeRemoved) {
                console.log("PROJECTILE: Projectile being removed now")
                return false;
            }

            // Log the entity that is being kept
            console.log('Keeping entity: ', entity);

            return true;
        });

        console.log('After filtering: ', this.entities.filter(entity => entity instanceof Enemy).length);

        // Check if enemies exist, if 0 enemies, spawn new enemy
        if (this.entities.filter(entity => entity instanceof Enemy).length == 0) {
            // Spawn new enemy
            this.spawnEnemies(5);
        }

        // Check if the player is dead
        if (this.player.isDead()) {
            console.log("PLAYER: Player is dead");
            this.entities = this.entities.filter((entity) => entity = this.player);
            // End game
            return this.endGame();
        }
    }

    // Render game scene
    render() {
        // If the game has ended, stop rendering
        if (this.gameLoopInterval === null) {
            return;
        }

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

            console.log("GAME: Spawning @ " + x, y);
            const enemy = new Enemy(x, y);
            this.addEntity(enemy);
            console.log("GAME: Enemies spawned");
            console.log(this.entities);
        }
    }

    endGame() {
        // End the game and display the game over screen
        // You can clear the interval that calls the update function, if you have one
        clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = null;

        // Game over screen
        this.showGameOverScreen();
    }

    showGameOverScreen() {
        // Display the game over message
        this.ctx.font = '48px sans-serif';
        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);

        // Display restart instructions
        this.ctx.font = '24px sans-serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Press R to restart', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
}