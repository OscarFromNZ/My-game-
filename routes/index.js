const express = require('express');
const router = express.Router();

// Serve the main game page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'My Browser Game'
  });
});

// Handle 404 errors
router.use((req, res, next) => {
  res.status(404);
  res.render('404', {
    title: '404 - Page Not Found'
  });
});

module.exports = router;