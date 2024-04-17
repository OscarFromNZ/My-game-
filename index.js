const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server); // Attach Socket.IO to the HTTP server

const indexRouter = require('./routes/index');

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Set the port for the server
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});