class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5;
        this.cursorX = 0;
        this.cursorY = 0;
    }

    // Update player state
    update() {
        // Handle player movement (example using arrow keys)
        if (this.isKeyPressed('KeyW')) {
            this.y -= this.speed;
        }
        if (this.isKeyPressed('KeyS')) {
            this.y += this.speed;
        }
        if (this.isKeyPressed('KeyA')) {
            this.x -= this.speed;
        }
        if (this.isKeyPressed('KeyD')) {
            this.x += this.speed;
        }

        // Handle shooting
        if (this.isKeyPressed('Space')) {
            this.shoot()
        }
    }

    // Render player on canvas
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Check if a key is pressed
    isKeyPressed(key) {
        return window.keyState && window.keyState[key] === true;
    }

    shoot() {
        // Adjust the starting position of the projectile based on your player model
        const projectileX = this.x + this.width / 2;
        const projectileY = this.y + this.height / 2;

        // Calculate the angle between the player and the cursor
        const dx = this.cursorX - (this.x + this.width / 2);
        const dy = this.cursorY - (this.y + this.height / 2);

        // Set the angle, speed, width, height, and color of the projectile
        const projectileAngle = Math.atan2(dy, dx);
        const projectileSpeed = 10;
        const projectileWidth = 5;
        const projectileHeight = 10;
        const projectileColor = 'black';

        // Create a new projectile and add it to the game
        const projectile = new Projectile(
            projectileX,
            projectileY,
            projectileAngle,
            projectileSpeed,
            projectileWidth,
            projectileHeight,
            projectileColor
        );
        game.addEntity(projectile);
    }
}

// Set up key state event listeners
window.keyState = {};
window.addEventListener('keydown', (e) => {
    window.keyState[e.code] = true;
});
window.addEventListener('keyup', (e) => {
    window.keyState[e.code] = false;
});