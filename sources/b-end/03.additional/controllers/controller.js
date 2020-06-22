// -- File : controller.js
const Product = require('../models/product.js');

class Controller {
  static getRootHandler(req, res) {
    res.send("Hello World");
  }

  static getUserHandler(req, res) {
    res.send("Logged in");
  }

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

  static getProductList(req, res) {
    Product.readAll((err, result) => {
      if (err) {
        res.send(err);
      }
      else {
        res.render('product-list', {
          title: "Product List",
          dataProduct: result 
        });
      }
    });
  }

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

  // method GET /prods/edit/:id
  // Tampilkan halaman views/product-edit.ejs
  static getProductEditHandler(req, res) {
    let idInput = req.params.id;

    Product.readSpecific(idInput, (err, result) => {
      if(err) {
        res.send(err);
      }
      else {
        res.render('product-edit', {
          title: "Product Update",
          dataProduct: result[0]
        });
      }
    });
  }

  // method POST /prods/edit/:id
  // Mengedit data
  static postProductEditHandler(req, res) {
    let idInput = Number(req.params.id);

    let objProduct = {
      id: idInput,
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc
    };

    Product.editData(objProduct, (err, result) => {
      if(err) {
        res.send(err);
      }
      else {
        res.redirect('/prods');
      }
    });
  }

  // method GET /prods/del/:id
  // Menghapus data
  static getProductDeleteHandler(req, res) {
    let idInput = Number(req.params.id);

    Product.deleteData(idInput, (err, result) => {
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