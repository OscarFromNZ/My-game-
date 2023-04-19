function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Calculate the Euclidean distance between two points (x1, y1) and (x2, y2)
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Check if two rectangles are colliding
function hasCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}