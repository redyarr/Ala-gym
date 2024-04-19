const Router = require('express').Router();
const PurchaseController = require('../controller/purchase');
const product = require('../models/products');
const check = require('express-validator').check;

Router.get('/add-purchase',PurchaseController.getAddPurchase);

Router.post('/add-purchase',check('quantity').custom((value,{req})=>{
const prodId = req.body.productId;
return product.findById(prodId).then(product =>{
if(product.quantity < value){
    console.log('Quantity is not enough');
    return Promise.reject('Quantity is not enough');

}
}
)
}),PurchaseController.postAddPurchase);





Router.get('/purchases',PurchaseController.getPurchases);

Router.post('/filter-purchases',PurchaseController.postFilterPurchases);

module.exports = Router;
