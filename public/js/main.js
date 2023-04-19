// Get the canvas element and set up the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Instantiate the game and player objects
const game = new Game(canvas, ctx);
const player = new Player(50, 50, 10, 10, "#eb3f76");

// Add the player to the game
game.addEntity(player);

// Handle mouse movements
canvas.addEventListener('mousemove', (e) => {
    // Calculate the cursor's position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // Update the player's cursor position
    player.cursorX = cursorX;
    player.cursorY = cursorY;
});


// Game loop
function gameLoop() {
    // Update game state
    game.update();

    // Render game scene
    game.render();

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();