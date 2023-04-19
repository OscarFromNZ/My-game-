class Projectile {
    constructor(x, y, angle, speed, width, height, color) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.color = color;
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