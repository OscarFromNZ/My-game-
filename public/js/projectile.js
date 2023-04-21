class Projectile {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.damage = CONSTANTS.PROJECTILE_DAMAGE;
        this.speed = CONSTANTS.PROJECTILE_SPEED;
        this.width = CONSTANTS.PROJECTILE_WIDTH;
        this.height = CONSTANTS.PROJECTILE_HEIGHT;
        this.color = CONSTANTS.PROJECTILE_COLOR;
    }

    // Update projectile state
    update(player, entities) {
        console.log("PROJECTILE: Projectile update successfully");
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Check if the projectile has collided with any entity (except itself)
        entities.forEach((entity) => {
            if (entity instanceof Enemy) {
                if (entity !== this && hasCollision(this, entity)) {
                    // reduce its health
                    entity.health -= this.damage;

                    console.log("PROJECTILE: Projectile colided with entity, preparing to destroy projectile");

                    // Remove the projectile from the game after collision
                    this.shouldBeRemoved = true;
                }
            }
        });
    }

    // Render projectile on canvas
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}  