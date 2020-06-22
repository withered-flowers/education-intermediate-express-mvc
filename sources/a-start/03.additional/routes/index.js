// -- FILE: routes/index.js
const express = require('express');
const router = express.Router();

// Jangan lupa untuk memanggil controller
const Controller = require('../controllers/controller.js');

// Jangan lupa untuk memanggil semua rute di luar index di sini
const users = require('./users.js');
const products = require('./products.js');

// gunakan router.blablabla
// seperti kita menggunakan app.blablabla
router.get('/', Controller.getRootHandler);

// definisikan rute untuk /users akan menggunakan users
router.use('/users', users);

// definisikan rute untuk /prods akan menggunakan products
router.use('/prods', products);

module.exports = router;