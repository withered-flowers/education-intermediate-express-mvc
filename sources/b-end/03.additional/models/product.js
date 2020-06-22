// -- FILE: product.js
const fs = require('fs');

class Product {
  constructor(id, name, price, desc) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.desc = desc;
  }

  static readAll(callback) {
    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
      if (err) {
        callback(err, null)
      }
      else {
        data = JSON.parse(data);

        let result = data.map((elem) => {
          return new Product(
            elem.id,
            elem.name,
            elem.price,
            elem.desc
          )
        });

        callback(null, result);
      }
    });
  }

  // untuk Endpoint GET /prods/:id
  // menerima parameter id dan callback untuk return value
  static readSpecific(id, callback) {
    // Untuk mempersingkat waktu, kita menggunakan readAll()
    // ingat bahwa readAll memiliki callback yang memiliki 2 parameter
    // err <-- untuk error
    // res <-- untuk output
    this.readAll((err, res) => {
      if (err) {
        callback(err, null);
      }
      else {
        // res = data dari readAll
        res = res.filter(elem => {
          return elem.id === Number(id);
        });

        // Data tidak ditemukan
        if (res.length == 0) {
          callback("Data tidak ditemukan", null);
        }
        else {
          callback(null, res);
        }
      }
    });
  }

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

  // Untuk POST /prods/edit/:id
  // Menerima 2 Parameter
  // objProduct = Object Product yang akan ditambahkan
  // callback = parameter kembalian
  //   menerima 2 parameter, err dan result
  static editData(objProduct, callback) {
    this.readAll((err, res) => {
      if(err) {
        callback(err, null);
      }
      else {
        res = res.map(elem => {
          if(elem.id === objProduct.id) {
            return new Product(
              objProduct.id,
              objProduct.name,
              objProduct.price,
              objProduct.desc
            )
          }
          else {
            return elem;
          }
        });

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

  // Untuk GET /prods/del/:id
  // Menerima 2 Parameter
  // id = id yang akan dihapus
  // callback = parameter kembalian
  //   menerima 2 parameter, err dan result
  static deleteData(id, callback) {
    this.readAll((err, res) => {
      if(err) {
        callback(err, null)
      }
      else {
        res = res.filter((elem) => {
          return elem.id !== Number(id);
        });

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