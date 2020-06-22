// -- FILE: routes/products.js
const express = require('express');
const router = express.Router();

// Jangan lupa untuk memanggil controller
const Controller = require('../controllers/controller.js');

// gunakan router.blablabla
// seperti kita menggunakan app.blablabla

// Ingat bahwa di sini kita tidak menggunakan tulisan /product ...
// lagi karena akan dihandle penambahan rutenya di routes/index.js
router.get('/', Controller.getProductList);
router.get('/:id', Controller.getProductSpecific);

module.exports = router;