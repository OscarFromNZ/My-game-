class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = CONSTANTS.PLAYER_HEALTH;
        this.width = CONSTANTS.PLAYER_WIDTH;
        this.height = CONSTANTS.PLAYER_HEIGHT;
        this.color = CONSTANTS.PLAYER_COLOR;
        this.speed = CONSTANTS.PLAYER_SPEED;
        this.cursorX = 0;
        this.cursorY = 0;
    }

    // Update player state
    update() {
        // Movement mechanics & handling
        const moveX = (direction) => {
            this.x += this.speed * direction;
            this.x = Math.max(0, Math.min(this.x, game.canvas.width - this.width));
        };

        const moveY = (direction) => {
            this.y += this.speed * direction;
            this.y = Math.max(0, Math.min(this.y, game.canvas.height - this.height));
        };


        // Handle player movement (example using arrow keys)
        if (this.isKeyPressed('KeyW')) {
            moveY(-1);
        }
        if (this.isKeyPressed('KeyS')) {
            moveY(1);
        }
        if (this.isKeyPressed('KeyA')) {
            moveX(-1);
        }
        if (this.isKeyPressed('KeyD')) {
            moveX(+1);
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
        const projectileAngle = Math.atan2(dy, dx);

        // Create a new projectile and add it to the game
        const projectile = new Projectile(
            projectileX,
            projectileY,
            projectileAngle,
        );
        game.addEntity(projectile);
        console.log("PROJECTILE: Created projectile");
    }

    isDead() {
        return this.health <= 0;
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

// Add a new event listener for left-click
document.getElementById('gameCanvas').addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        console.log("PLAYER: Clicked mousedown, shooting")
        game.player.shoot();
    }
});