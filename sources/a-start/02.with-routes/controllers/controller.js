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