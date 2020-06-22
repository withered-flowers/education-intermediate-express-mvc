const express = require('express');
const app = express();

const Controller = require('./controllers/controller.js');

const PORT = 3000;

// Gunakan view engine ejs
app.set('view engine', 'ejs');

// Untuk `GET /`
app.get('/', (req, res) => {
  // GET / handler pada Controller
  Controller.getRootHandler(req, res);
});

app.get('/user', (req, res) => {
  // GET /user handler para Controller
  Controller.getUserHandler(req, res);
});

// Coba dijalankan terlebih dahulu

// Berasa aneh bukan apabila kita membuat fungsi
// untuk menerima req dan res
// kemudian di dalam nya kita memanggil fungsi
// yang juga menerima req dan res juga
// Kita bisa mempersingkat hal itu dengan ...
app.get('/prod', Controller.getProductList);

app.get('/prod/:id', Controller.getProductSpecific);

app.listen(PORT, () => {
  console.log(`Hello apps @ localhost:${PORT}`);
});