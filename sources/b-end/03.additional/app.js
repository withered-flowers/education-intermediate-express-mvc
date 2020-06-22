const express = require('express');
const app = express();

// Controller sudah tidak digunakan di sini
// const Controller = require('./controllers/controller.js');

// Di sini kita akan import rute yang terpisah
const index = require('./routes/index.js');

const PORT = 3000;

app.set('view engine', 'ejs');

// Jangan lupa tambahkan urlencoded apabila kita ingin menggunakan
// form
app.use(express.urlencoded({ extended: false }));

// Kita akan mengganti semuanya
// app.get('/', (req, res) => {
//   Controller.getRootHandler(req, res);
// });

// app.get('/users', (req, res) => {
//   Controller.getUserHandler(req, res);
// });

// app.get('/prods', Controller.getProductList);

// app.get('/prods/:id', Controller.getProductSpecific);

// Menjadi
app.use('/', index);

app.listen(PORT, () => {
  console.log(`Hello apps @ localhost:${PORT}`);
});