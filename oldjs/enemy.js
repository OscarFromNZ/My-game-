class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = CONSTANTS.ENEMY_HEALTH;
        this.damage = CONSTANTS.ENEMY_DAMAGE;
        this.width = CONSTANTS.ENEMY_WIDTH;
        this.height = CONSTANTS.ENEMY_HEIGHT;
        this.color = CONSTANTS.ENEMY_COLOR;
        this.speed = CONSTANTS.ENEMY_SPEED;
        this.attackCooldown = CONSTANTS.SHOOTING_COOLDOWN;
        this.lastAttack = Date.now();
    }

    // Update enemy state
    update(player, entities) {
        // Calculate the angle between the enemy and the player
        const dx = player.x + player.width / 2 - (this.x + this.width / 2);
        const dy = player.y + player.height / 2 - (this.y + this.height / 2);
        const angle = Math.atan2(dy, dx);

        // Move the enemy towards the player
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        // Attack player if collided and can
        if (Date.now() - this.lastAttack > this.attackCooldown && hasCollision(player, this)) {
            console.log("ENEMY: Colided with player, attacking");
            // Attack the player
            this.attack(player);

            // Update the time of the last shot
            this.lastAttack = Date.now();
        }
    }

    // Render enemy on canvas
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    attack(player) {
        player.health = player.health - this.damage;
    }

    isDead() {
        return this.health <= 0;
    }
}
