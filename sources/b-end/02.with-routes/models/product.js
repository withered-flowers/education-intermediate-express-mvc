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
    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
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