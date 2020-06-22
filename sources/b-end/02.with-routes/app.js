const express = require('express');
const app = express();

const Controller = require('./controllers/controller.js');

const index = require('./routes/index.js');
const user = require('./routes/user.js');
// Di sini kita akan import rute product
const product = require('./routes/product.js');


const PORT = 3000;

app.set('view engine', 'ejs');

app.use('/', index);

app.use('/user', user);

// Kita akan mengganti ini
// app.get('/prod', Controller.getProductList);
// app.get('/prod/:id', Controller.getProductSpecific);

// Menjadi
app.use('/prod', product);

app.listen(PORT, () => {
  console.log(`Hello apps @ localhost:${PORT}`);
});