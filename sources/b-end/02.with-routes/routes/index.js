// -- FILE: routes/index.js
const express = require('express');
const router = express.Router();

// Jangan lupa untuk memanggil controller
const Controller = require('../controllers/controller.js');

// gunakan router.blablabla
// seperti kita menggunakan app.blablabla
router.get('/', Controller.getRootHandler);

module.exports = router;