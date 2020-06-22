// -- FILE: routes/products.js
const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller.js');

router.get('/', Controller.getProductList);

router.get('/add', Controller.getProductAddHandler);
router.post('/add', Controller.postProductAddHandler);

router.get('/edit/:id', Controller.getProductEditHandler);
router.post('/edit/:id', Controller.postProductEditHandler);

// Penambahan rute untuk delete product (get)
router.get('/del/:id', Controller.getProductDeleteHandler);

router.get('/:id', Controller.getProductSpecific);

module.exports = router;