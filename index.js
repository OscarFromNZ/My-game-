const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index'); // Import the index router

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the index router
app.use('/', indexRouter);

// Set the port for the server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:3000`);
});