// Get the canvas element and set up the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = CONSTANTS.CANVAS_WIDTH;
canvas.height = CONSTANTS.CANVAS_HEIGHT;

// Instantiate the game 
const game = new Game(canvas, ctx);
const player = game.player;

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
