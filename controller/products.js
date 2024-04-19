const Products = require('../models/products');
const purchase = require('../models/purchase');

exports.getAddProduct = (req, res, next) => {
    res.render('add-products')
}



exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const quantity = req.body.quantity;
    const product = new Products({
        name: name,
        price: price,
        image: image,
        quantity: quantity
    });
    product.save().then(result => {
        console.log('Created Product');
        res.redirect('/products');
    }).catch(err => {
        console.log(err);
    });
}



exports.getProducts = (req, res, next) => {

    Products.find().then(products => {
        res.render('products',{products});
    }).catch(err => {
        console.log(err);
    });
};



exports.postIncreaseProductQuantity = (req, res, next) => {
    const prodId = req.body.productId;
    const amount = req.body.increaseAmount
    Products
        .findById(prodId)
        .then(product => {
            product.quantity += parseInt(amount);
            return product.save();
        })
        .then(() => {
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });
    }


exports.postDecreaseProductQuantity = (req, res, next) => {
    const prodId = req.body.productId;
    const amount = req.body.decreaseAmount
    Products
        .findById(prodId)
        .then(product => {
            product.quantity -= parseInt(amount);
            return product.save();
        })
        .then(() => {
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });
    }

exports.DeleteProduct = (req, res, next) => {
    const prodId = req.params.id;
    purchase.updateMany({ product: prodId }, { $set: { product: null } }, function(err) {
        if (err) {
          console.log(err);
        }});

    Products.findById(prodId).then(product => {
        product.deleteOne().then(() => {
            res.redirect('/products');
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    }
    )
}