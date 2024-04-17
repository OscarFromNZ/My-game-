const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'My Browser Game'
  });
});

router.use((req, res, next) => {
  res.status(404);
  res.render('404', {
    title: '404 - Page Not Found'
  });
});

module.exports = router;