const Purchase = require("../models/purchase"); // Import the Purchase model
const Product = require("../models/products");
const customer = require("../models/customers");

const { validationResult } = require("express-validator");

exports.getAddPurchase = (req, res, next) => {
  
  let customers;
  let products;
  customer
    .find()
    .then((result) => {
      customers = result;
      return Product.find();
    })
    .then((result) => {
      products = result;
      res.render("add-purchase", {
        customers: customers,
        products: products,
        errorMessage: "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddPurchase = async(req, res, next) => {



  const Customer = req.body.customerId;
  const product = req.body.productId;
  const quantity = req.body.quantity;

const errors = validationResult(req);
if (!errors.isEmpty()) {

  const customers =await customer.find();
  const products = await Product.find();

    return res.status(422).render('add-purchase', {
        pageTitle: 'Add Purchase',
        path: '/add-purchase',
        errorMessage: errors.array()[0].msg,
        customers: customers,
        products: products,
        purchase: {
            quantity: req.body.quantity,
            customerId: req.body.customerId,
            productId: req.body.productId
        }
    });
}

const newPurchase = new Purchase({
    customer: Customer,
    product: product,
    quantity: quantity,
});
newPurchase.save().then((result) => {
    Product.findById(product).then((prod) => {
        // ...
    });
});
};


//fix this is not working 
exports.getPurchases = (req, res, next) => {
  function calculateTotalMoney(purchases) {
    let total = 0;
    for(let purchase of purchases) {
      if(purchase.product === null){
        console.log(`product with id ${purchase.product} does not exist`);
        continue;
      }
      total += purchase.product.price * purchase.quantity;
    }
    return total;
  }
  
  Purchase.find()
    .populate("customer")
    .populate("product")
    .then((purchases) => {
      let hasNullCustomerOrProduct = purchases.some(purchase => purchase.customer === null || purchase.product === null);
      if (hasNullCustomerOrProduct || purchases.length === 0) {
        res.render("purchases", { purchases ,total:0});
      } else {
        let total = calculateTotalMoney(purchases);
        res.render("purchases", { purchases ,total});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};






exports.postFilterPurchases = (req, res, next) => {
  const inputDate = new Date(req.body.date);
  const startDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 0, 0, 0));
  const endDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 23, 59, 59));

  Purchase.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  })
  .populate("customer")
  .populate("product")
  .then((purchases) => {
    let totals=  function calculateTotalMoney(purchases) {
      let total = 0;
      for(let purchase of purchases) {
        total += purchase.product.price * purchase.quantity;
      }
      return total;
    }
    res.render("purchases", { purchases ,total:totals(purchases)});
  })
  .catch((err) => {
    console.log(err);
  });
}
