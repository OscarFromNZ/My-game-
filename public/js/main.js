// Get the canvas element and set up the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = CONSTANTS.CANVAS_WIDTH;
canvas.height = CONSTANTS.CANVAS_HEIGHT;

// Instantiate the game 
let game = new Game(canvas, ctx);

// Start the game loop
game.startGameLoop();

// Handle mouse movements
canvas.addEventListener('mousemove', (e) => {
    // Calculate the cursor's position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // Update the player's cursor position
    game.player.cursorX = cursorX;
    game.player.cursorY = cursorY;
});

// Listen for 'R' key to restart the game
window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR') {
        // Create a new game instance
        game = new Game(canvas, ctx);

        // Start the game loop
        game.startGameLoop();
    }
});