class Projectile {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = CONSTANTS.PROJECTILE_SPEED;
        this.width = CONSTANTS.PROJECTILE_WIDTH;
        this.height = CONSTANTS.PROJECTILE_HEIGHT;
        this.color = CONSTANTS.PROJECTILE_COLOR;
    }

    // Update projectile state
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    // Render projectile on canvas
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}  