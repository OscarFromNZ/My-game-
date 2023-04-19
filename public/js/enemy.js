class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = CONSTANTS.ENEMY_WIDTH;
    this.height = CONSTANTS.ENEMY_HEIGHT;
    this.color = CONSTANTS.ENEMY_COLOR;
    this.speed = CONSTANTS.ENEMY_SPEED;
    this.shootingCooldown = CONSTANTS.SHOOTING_COOLDOWN;
    this.lastShot = Date.now();
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

    // Shoot towards the player if the cooldown is over
    if (Date.now() - this.lastShot > this.shootingCooldown) {
        // Calculate the direction of the projectile
        const projectileSpeed = CONSTANTS.PROJECTILE_SPEED;
        const projectileDx = Math.cos(angle) * projectileSpeed;
        const projectileDy = Math.sin(angle) * projectileSpeed;
    
        // Create a new projectile and add it to the game's entities
        const projectile = new Projectile(
          this.x + this.width / 2,
          this.y + this.height / 2,
          CONSTANTS.PROJECTILE_WIDTH,
          CONSTANTS.PROJECTILE_HEIGHT,
          CONSTANTS.PROJECTILE_COLOR,
          projectileDx,
          projectileDy
        );
        entities.push(projectile);
    
        // Update the time of the last shot
        this.lastShot = Date.now();
      }
  }
  
    // Render enemy on canvas
    render(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  