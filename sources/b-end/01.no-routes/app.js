const express = require('express');
const app = express();

const Controller = require('./controllers/controller.js');

const PORT = 3000;

// Gunakan view engine ejs
app.set('view engine', 'ejs');

// Jangan lupa tambahkan urlencoded apabila kita ingin menggunakan
// form
app.use(express.urlencoded({ extended: false }));

// Untuk `GET /`
app.get('/', (req, res) => {
  // GET / handler pada Controller
  Controller.getRootHandler(req, res);
});

app.get('/users', (req, res) => {
  // GET /users handler para Controller
  Controller.getUserHandler(req, res);
});

// Coba dijalankan terlebih dahulu

// Berasa aneh bukan apabila kita membuat fungsi
// untuk menerima req dan res
// kemudian di dalam nya kita memanggil fungsi
// yang juga menerima req dan res juga
// Kita bisa mempersingkat hal itu dengan ...
app.get('/prods', Controller.getProductList);

app.get('/prods/:id', Controller.getProductSpecific);

app.listen(PORT, () => {
  console.log(`Hello apps @ localhost:${PORT}`);
});