## Table of Content
1. [Recap MVC](#recap-mvc)
1. [Recap Express](#recap-express)
1. [Let's Combine Express with MVC](#lets-combine-express-with-mvc)
1. [Postlude - Router](#postlude---router)
1. [Additional - Optional with Quirks](#additional---optional-with-quirks)
1. [Referensi](#referensi)

## Recap MVC
Hayo, masih ingat tidak MVC itu apa?  

Ini ada sedikit recap mengenai MVC yah sejenak.

MVC merupakan sebuah pola desain pemrograman dimana kita meng-*kode*-kan 
aplikasi yang dibuat menjadi 3 domain besar:
* Model - yang merupakan domain yang berhubungan dengan `data`
* View - yang merupakan domain yang berhubungan dengan `User Interface`
* Controller - yang merupakan domain `otak` atau `processor` yang akan 
  memproses input dari user dan berhubungan langsung dengan `Model` dan 
  `View`.

## Recap Express
Sekilas mengenai MVC sudah, sekarang kita coba mengingat kembali *nih* tentang
framework kesayangan kita, yaitu `Express`. 

Express merupakan framework populer pada nodejs yang dibuat untuk memudahkan
developer dalam mengembangkan aplikasi web.

(Dengan asumsi bahwa instalasi tanpa global package)  
Cara untuk menggunakan Express ini adalah dengan:
1. Menjalankan `git init`
1. Menjalankan `npm init (-y)`
1. Meng-*install* module yang dibutuhkan dengan `npm install express ejs` (ejs 
   merupakan view engine yang akan digunakan untuk merender view supaya jadi 
   lebih *berwarna*)
1. Meng-*install* module untuk monitoring dengan `npm install -D nodemon`
1. Jangan lupa untuk exlucde `node_modules` via `.gitignore`
1. Membuat file `main` dari aplikasi (umumnya bernama `app.js` pada Express).

Sehingga setelah langkah di atas dijalankan, maka akan didapatkan struktur
folder / directory pada Workspace kita adalah:

```
├── node_modules
│   └── ...
├── app.js
├── package.json
└── package-lock.json
```

Struktur folder ini merupakan struktur folder terminimal ketika kita 
akan mengembangkan aplikasi Express, yang umumnya tidak akan kita
buat seminimal itu, apalagi, stelah kita sudah menggunakan data dan
menerapkan konsep MVC di dalam Express ini.

## Let's Combine Express with MVC
Misalkan dalam pembelajaran ini kita akan membuat sebuah aplikasi sederhana 
untuk membaca dan menampilkan product dan memiliki beberapa endpoint:

| Endpoint       | Description                             |
| -------------- | --------------------------------------- |
| GET /          | Tampilkan "Hello World"                 |
| GET /users     | Tampilkan "Logged In"                   |
| GET /prods     | Tampilkan list produk dalam tabel       |
| GET /prods/:id | Tampilkan produk yang dicari (OPTIONAL) |

Diberikan juga data awal berupa file dengan ekstensi json yang terdapat pada 
`data/products.json`.

Sehingga, mari kita buat aplikasi ini dalam bentuk MVC !

### Langkah 1 - Buat folder tambahan
Oleh karena kita ingin mengimplementasikan MVC, maka struktur folder 
harus ditambahkan untuk Model, View, dan Controller, sehingga struktur
foldernya nanti akan menjadi:

```
.
├── controllers
├── data
├── models
├── node_modules
├── views
├── app.js
├── package.json
└── package-lock.json
```

### Langkah 2 - Buat file app.js
Pada file `app.js` kita akan menambahkan kode awal untuk mendefinisikan
rute Endpoint sebagai berikut:

```javascript
const express = require('express');
const app = express();

const PORT = 3000;

// Gunakan view engine ejs
app.set('view engine', 'ejs');

// Jangan lupa tambahkan urlencoded apabila kita ingin menggunakan
// form
app.use(express.urlencoded({ extended: false }));

// Untuk `GET /`
app.get('/', (req, res) => {
  // Logic here
});

app.get('/users', (req, res) => {
  // Logic here
});

app.get('/prods', (req, res) => {
  // Logic here
});

app.get('/prods/:id', (req, res) => {
  // Logic here
});

app.listen(PORT, () => {
  console.log(`Hello apps @ localhost:${PORT}`);
});
```

### Langkah 3 - Buat file controller dan model.
WARNING:  
Untuk mempersingkat waktu, maka semuanya akan ditampung dalam 1 file controller
dengan nama `controller.js`. Namun untuk `best practice` nya adalah dengan 
memisahkan fungsi menjadi controller tersendiri, e.g.: `UserController`, 
`ProductController`.

Langkah selanjutnya adalah dengan membuat controller pada folder `controllers` 
dengan nama `controller.js` dan membuat model pada folder `models` dengan nama
`product.js`

Berikut adalah kode untuk `controller.js` dan `product.js`
```javascript
// -- File : controller.js

// 01.
// Nantinya akan memanggil model di sini.
// lihat nomor 02 terlebih dahulu

// 12.
// import model
const Product = require('../models/product.js');

class Controller {
  // 02.
  // Ingat, pada express 
  // req = request <-- untuk input
  // res = response <-- untuk output 

  // sehingga pada Controller, kita membutuhkan 
  // kedua parameter tersebut supaya kita bisa
  // memanipulasi input dan output.
  static getRootHandler(req, res) {
    // 03.
    // Hanya untuk menampilkan Hello World directly
    // Maka...
    res.send("Hello World");
  }

  static getUserHandler(req, res) {
    // 04a.
    // Hanya untuk menampilkan Logged In directly
    // Maka...
    res.send("Logged in");
  }

  static getProductSpecific(req, res) {
    // 04b.
    // Ceritanya method ini belum kita implementasikan
    // tapi kita tidak mau membuat aplikasi kita berhenti
    // Maka...
    res.send("Not implemented yet !");
  }

  static getProductList(req, res) {
    // 05.
    // Di sini kita butuh untuk memanggil data bukan?
    // Maka sekarang kita butuh untuk memanggil Model
    // Mari buat file model
    // (Pindah ke file models/product.js)


    // 12.
    // Jangan lupa import model dan gunakan
    // Ingat readAll menerima 1 parameter callback
    // callbacknya menerima 2 buah parameter
    //   err <-- untuk error
    //   result <-- untuk hasil
    Product.readAll((err, result) => {
      // 13.
      // Bila error, controller akan passing ke view error
      if (err) {
        res.send(err);
      }
      // 14.
      // Bila success, controller akan passing ke view success
      // setelah ini berarti butuh tampilannya bukan?
      // Mari kita membuat sebuah view 
      // pada folder views dengan nama product-list.ejs
      // lihat views/product-list.ejs
      else {
        // 17.
        // Render file berdasarkan parameter yang didefine
        // di views/product-list.ejs
        res.render('product-list', {
          title: "Product List",
          dataProduct: result 
        });
        // 18.
        // Sampai di sini kita akan memodif app.js untuk dapat
        // menjalankan controller ini terlebih dahulu yah !
        // buka app.js
      }
    });
  }
}

module.exports = Controller;
```

```javascript
// -- FILE: product.js
// 06. 
// Karena pasti akan membaca file di model,
// maka require fs
const fs = require('fs');

class Product {

  // 06.
  // Buat constructor Model product berdasarkan data
  // dari product.json
  constructor(id, name, price, desc) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.desc = desc;
  }

  // 07.
  // Ingat bahwa kalau kita menggunakan ala callback
  // maka return akan kita pass melalui si callback ini
  // Gunakan ala error first argument agar lebih murah 
  // trace errornya
  static readAll(callback) {
    fs.readFile('./products.json', 'utf-8', (err, data) => {
      // 08.
      // Kalau error
      // first argument error balikkan error
      // second argument data balikkan null
      if (err) {
        callback(err, null)
      }
      // 09.
      // Kalau sukses
      // First argument error balikkan null
      // Second argument error balikkan data
      else {
        data = JSON.parse(data);

        // 10.
        // Karena kita menggunakan OOP
        // maka jangan lupa mapping jadi OOP
        let result = data.map((elem) => {
          return new Product(
            elem.id,
            elem.name,
            elem.price,
            elem.desc
          )
        });

        // 11.
        // Kalau sukses, return null, result
        // Kembali ke controllers/controller.js
        callback(null, result);
      }
    });
  }
}

module.exports = Product;
```

### Langkah 04 - Membuat view
Karena kita membutuhkan tampilan, artinya kita butuh membuat sebuah file baru
pada folder `views` dengan nama `product-list.ejs`.

Berikut adalah isi dari file `views/product-list.ejs`:

```html
<!-- File: views/product-list.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <!-- 
    Ingat struktur tabel
    table
      thead
        tr
          th
      tbody 
        tr
          td
  -->

  <!-- 
    15.
    Perhatikan di file ini kita membutuhkan 2 value yang didefine yah
    title untuk tulisan judul
    dataProduct untuk value yang akan ditampilkan pada tabel

    16. 
    Setelah membuat ini semua
    Kembali ke file controllers/controller.js
  -->
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>price</th>
        <th>desc</th>
      </tr>
    </thead>
    <tbody>
      <% dataProduct.forEach(elem => { %> 
        <tr>
          <td><%= elem.id %></td>
          <td><%= elem.name %></td>
          <td><%= elem.price %></td>
          <td><%= elem.desc %></td>
        </tr>  
      <% }) %>
    </tbody>
  </table>
</body>
</html>
```

### Langkah 05 - Modifikasi app.js

Setelah ini selesai ditulis, maka kita akan memodifikasi `app.js` agar
kode dapat dicoba dijalankan.

```javascript
// --FILE: app.js
...
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
```

Selamat, sampai dengan tahap ini, artinya kita sudah berhasil menggunakan MVC
pada aplikasi express yang kita buat !

Struktur folder kita sekarang adalah:
```
.
├── controllers
│   └── controller.js
├── data
│   └── products.json
├── models
│   └── product.js
├── node_modules
│   └── ...
├── views
│   └── product-list.ejs
├── app.js
├── package.json
└── package-lock.json
```

## Postlude - Router
Bagaimana jadinya apabila aplikasi yang kita buat sudah berkembang sangat besar
dan memiliki ratusan hingga ribuan rute endpoint?

Tentunya kita tidak mungkin menaruh semuanya dalam file `app.js` saja bukan?

Nah, pada express ini sendiri, juga sudah bisa untuk memecah rute agar lebih
modular dengan menggunakan `express.Router`.

Cara menggunakannya dapat dilihat pada dokumentasi express di 
[sini](https://expressjs.com/en/guide/routing.html)

Namun untuk mempersingkat waktu, inilah cara dan langkah-langkahnya.

### Langkah 1 - Buat folder penampung rute
Buatlah sebuah folder untuk menampung seluruh macam rute yang ada, umumnya
dalam folder yang bernama `routes`.

### Langkah 2 - Pengkotakan atau Pemisahan rute
Setelah membuat folder `routes`, sekarang kita harus berpikir, bagaimanakah
cara pengkotak-kotakan rute nya?

Umumnya pengkotakan rute ini adalah berdasarkan `resource` yang digunakan,
misalnya pada aplikasi yang kita buat sebelumnya, pengkotakan ini adalah
berdasarkan, pada saat ingin menggunakan `user` maka routesnya adalah `users`,
kemudian pada saat ingin menggunakan `product` maka routesnya adalah `products`,
dan semuanya itu akan kita gabungkan dalam sebuah rute utama bernama `index`

Maka berdasarkan ini, kita bisa membagi menjadi 3 rute besar:
* `index`
* `users`
* `products`

Sehingga pada folder `routes`, kita akan membuat 3 rute utama tersebut,
`index.js`, `users.js`, dan `products.js`

### Langkah 3 - Menggunakan express.Router pada routes/users.js
Sekarang kita akan membuat rute `users` terlebih dahulu.

Berikut adalah kode untuk `routes/users.js`

```javascript
// -- FILE: routes/users.js
const express = require('express');
const router = express.Router();

// Jangan lupa untuk memanggil controller
const Controller = require('../controllers/controller.js');

// Nah untuk endpoint yang kita inginkan 
// adalah untuk /users
// maka untuk router.get nya BUKAN /user melainkan / saja
// Untuk lebih lanjutnya dapat diketahui pada saat kita melihat
// routes/index.js nanti
router.get('/', Controller.getUserHandler);

module.exports = router;
```

### Langkah 4 - Mengunakan express.router pada routes/products.js
Sekarang bagaimana dengan si `routes/products.js` ?

Mari kita coba mengkodekannya !

```javascript
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
```

Perhatikan bahwa sama dengan `routes/users.js` kita tidak menambahkan endpoint
`/products` pada routes, karena akan ditambahkan pada `routes/index.js`

### Langkah 5 - Menggunakan express.Router pada routes/index.js
Sekarang kita akan menggunakan express.Router pada `routes/index.js` dan
menggabungkan seluruh rute yang ada di sini.

Caranya adalah dengan menuliskan kode sebagai berikut:
```javascript
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
```

Dapat dilihat dari kode di atas bahwa semua rute yang sudah didefinisikan
(`/users` dan `/products`) ada di dalam `routes/index.js` ini.

Selanjutnya kita akan memodifikasi file `app.js` supaya dapat membaca
`routes/index.js` ini.

### Langkah 6 - Modifikasi app.js
Sekarang setelah kita menambahkan rute via `express.Router`, kita akan 
menggunakannya dengan cara memodifikasi `app.js`

```javascript
const express = require('express');
const app = express();

// Controller sudah tidak digunakan di sini
// const Controller = require('./controllers/controller.js');

// Di sini kita akan import rute yang terpisah
const index = require('./routes/index.js');

const PORT = 3000;

app.set('view engine', 'ejs');

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
```

Perhatikan bahwa struktur folder akhir kita akan menjadi:
```
.
├── controllers
│   └── controller.js
├── data
│   └── products.json
├── models
│   └── product.js
├── node_modules
│   └── ...
├── routes
│   ├── index.js
│   ├── products.js
│   └── users.js
├── views
│   └── product-list.ejs
├── app.js
├── package.json
└── package-lock.json
```

Selamat ! kita sudah berhasil menerapkan MVC Express dan Router sampai di 
sini !

## Additional - Optional with Quirks
Mari kita mencoba menyelesaikan additional dengan tambahan rute seperti ini:

| Endpoint             | Description                             |
| -------------------- | --------------------------------------- |
| GET /                | Tampilkan "Hello World"                 |
| GET /users           | Tampilkan "Logged In"                   |
| GET /prods           | Tampilkan list produk dalam tabel       |
| GET /prods/:id       | Tampilkan produk yang dicari            |
| GET /prods/add       | Tampilkan halaman penambahan produk     |
| POST /prods/add      | Handle form penambahan produk           |

### Langkah 1 - Menyelesaikan GET /prods/:id
Mari kita buka kembali `models/product.js` untuk menambahkan fitur untuk
`filter` agar dapat digunakan oleh Controller pada endpoint `GET /prods/:id`

```javascript
// -- FILE: product.js
const fs = require('fs');

class Product {
  ...
  // untuk Endpoint GET /prods/:id
  // menerima parameter id dan callback untuk return value
  static readSpecific(id, callback) {
    // Untuk mempersingkat waktu, kita menggunakan readAll()
    // ingat bahwa readAll memiliki callback yang memiliki 2 parameter
    // err <-- untuk error
    // res <-- untuk output
    this.readAll((err, res) => {
      if(err) {
        callback(err, null);
      }
      else {
        // res = data dari readAll
        console.log(res);

        res = res.filter(elem => {
          return elem.id === Number(id);
        });

        // Data tidak ditemukan
        if(res.length == 0) {
          callback("Data tidak ditemukan", null);
        }
        else {
          callback(null, res);
        }
      }
    });
  }
}

module.exports = Product;
```

Selanjutnya kita akan memodifikasi file `controllers/controller.js` dan
mengganti method `getProductSpecific`

```javascript
// -- File : controller.js
const Product = require('../models/product.js');

class Controller {
  ...
  static getProductSpecific(req, res) {
    // Sekarang kita implementasikan ini

    // kita akan mengambil si id dari parameter yang sudah didefine
    // ingat bahwa req.params semuanya adalah string / array
    // Konversi ke number
    let idInput = Number(req.params.id);
    Product.readSpecific(idInput, (err, result) => {
      if(err) {
        res.send(err);
      }
      else {
        res.render('product-list', {
          title: "Product List Specific",
          dataProduct: result
        });
      }
    });
  }
  ...
}

module.exports = Controller;
```

### Langkah 2 - Mengimplementasikan GET & POST /prods/add
Sekarang kita akan menambahkan endpoint `GET` dan `POST` `/prods/add`. Karena
semua penambahan rute terjadi di routes, dan ini berhubungan dengan product,
maka kita akan:
* menambahkan view `product-add.ejs`
* menambahkan method pada `model/product.ejs` untuk menambahkan data dalam
  file `product.json` dengan nama method `addData`
* menambahkan 2 method baru pada `controllers/controller.js` yaitu method 
  `getProductAddHandler` dan `postProductAddHandler`
* mengedit file `routes/products.js`  untuk menambahkan endpoint `GET` dan
  `POST` untuk `/prods/add`

Penambahan file `views/product-add.ejs` dengan kodenya adalah sebagai berikut:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <form action="/prods/add" method="post">
    <input type="text" name="name" id="name" />
    <input type="text" name="price" id="price" />
    <input type="text" name="desc" id="desc" />
    <button type="submit">Add</button>
  </form>
</body>
</html>
```

Selanjutnya kita akan menambahkan method pada `models/product.js` untuk
penambahan data, dengan nama method `addData`.

Kodenya adalah sebagai berikut:
```javascript
// -- FILE: product.js
const fs = require('fs');

class Product {
  ...

  // Untuk POST /prods/add
  // Menerima 2 Parameter
  // objProduct = Object Product yang akan ditambahkan
  // callback = parameter kembalian
  //   menerima 2 parameter, err dan result
  static addData(objProduct, callback) {
    this.readAll((err, res) => {
      if (err) {
        callback(err, null);
      }
      else {
        // Fetch max id
        let maxId = Number(res[res.length - 1].id) + 1;

        let newProduct = new Product(
          maxId,
          objProduct.name,
          objProduct.price,
          objProduct.desc
        );

        res.push(newProduct);

        fs.writeFile(
          './data/products.json', 
          JSON.stringify(res, null, 2),
          (err) => {
            if(err) {
              callback(err, null);
            }
            else {
              callback(null, null);
            }
          }
        );
      }
    });
  }
}

module.exports = Product;
```

Selanjutnya adalah kita akan melakukan penambahan method pada file
`controllers/controller.js` dengan nama `getProductAddHandler` dan
`postProductAddHandler`

```javascript
// -- File : controller.js
const Product = require('../models/product.js');

class Controller {
  ...
  // method GET /prods/add
  // Tampilkan halaman views/product-add.ejs
  static getProductAddHandler(req, res) {
    res.render('product-add', {
      title: "Product Add"
    });
  }

  // method POST /prods/add
  // Menambahkan data 
  static postProductAddHandler(req, res) {
    // Buat objectProduct berdasarkan data dari form
    let objProduct = {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc
    };

    // Kirimkan ke models/product.js method addData
    Product.addData(objProduct, (err, result) => {
      if(err) {
        res.send(err);
      }
      else {
        res.redirect('/prods');
      }
    });
  }
}

module.exports = Controller;
```

Selanjutnya adalah kita akan menambahkan rute pada `routes/products.js`

```javascript
// -- FILE: routes/products.js
const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller.js');

router.get('/', Controller.getProductList);

// Penambahan rute untuk penambahan product (get dan post)
router.get('/add', Controller.getProductAddHandler);
router.post('/add', Controller.postProductAddHandler);

// Ingat posisi menentukan prestasi
router.get('/:id', Controller.getProductSpecific);

module.exports = router;
```

Selamat sampai di tahap ini artinya kita sudah berhasil untuk membuat CRUD
pada aplikasi sederhana berbasis Express yang sudah menggunakan pola MVC !

## Referensi
[ExpressJS - Router Documentation](https://expressjs.com/en/guide/routing.html)