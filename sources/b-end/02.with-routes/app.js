const express = require('express');
const app = express();

const index = require('./routes/index.js');
const user = require('./routes/user.js');
const product = require('./routes/product.js');

const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use('/', index);

app.use('/users', user);

app.use('/prods', product);

app.listen(PORT, () => {
  console.log(`Hello apps @ localhost:${PORT}`);
});