async function startGame() {
    const app = new PIXI.Application();

    await app.init({ background: '#1099bb', resizeTo: window });

    document.body.appendChild(app.canvas);

    const gr = new PIXI.Graphics();
    gr.beginFill(0xffffff);
    gr.drawCircle(30, 30, 30);
    gr.endFill();
    app.stage.addChild(gr)

    app.ticker.add((delta) => {
        // Rotate the circle
        circle.rotation += 0.1 * delta;
    });


    const socket = io();

    // Handle events
    socket.on('chat message', (msg) => {
        // Handle incoming messages
        console.log('Received message:', msg);
    });

    // Emit a chat message
    socket.emit('chat message', 'Hello, world!');
}

window.onload = startGame;