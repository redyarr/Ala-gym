const Router = require('express').Router();
const ProductController = require('../controller/products');

Router.get('/add-products',ProductController.getAddProduct);
Router.post('/add-products',ProductController.postAddProduct);

Router.get('/products',ProductController.getProducts);

Router.post('/increase-product-quantity',ProductController.postIncreaseProductQuantity)


Router.post('/decrease-product-quantity',ProductController.postDecreaseProductQuantity)

Router.delete('/delete-product/:id',ProductController.DeleteProduct)

module.exports = Router;
