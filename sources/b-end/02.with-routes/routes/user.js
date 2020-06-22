// -- FILE: routes/user.js
const express = require('express');
const router = express.Router();

// Jangan lupa untuk memanggil controller
const Controller = require('../controllers/controller.js');

// Nah untuk endpoint yang kita inginkan 
// adalah untuk /user
// maka untuk router.get nya BUKAN /user melainkan / saja
// Untuk lebih lanjutnya dapat diketahui pada saat kita melihat
// app.js nanti
router.get('/', Controller.getUserHandler);

module.exports = router;