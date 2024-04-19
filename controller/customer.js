const Customers = require('../models/customers');
const Purchase = require('../models/purchase');

exports.getAddCustomer = (req, res, next) => {
    res.render('add-customers')
}


exports.postAddCustomer = (req, res, next) => {
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const age = req.body.age;
    const image = req.body.image;
    const customer = new Customers({
        Fname: Fname,
        Lname: Lname,
        age: age,
        image: image
    });
    customer.save().then(result => {
        console.log('Created Customer');
        res.redirect('/customers');
    }).catch(err => {
        console.log(err);
    });
}


exports.getCustomers = (req, res, next) => {
let editMode = req.query.edit;



    Customers.find().then(customers => {
        res.render('customers', {
            customers: customers, editMode: editMode
        });
    }).catch(err => {
        console.log(err);
    });
}


exports.getCustomer = async (req, res) => {
    const customer = await Customers.findById(req.params.id);
    const purchases = await Purchase.find({ customer: req.params.id }).populate('product');
    res.render('customer-one', { customer: customer, purchases: purchases });
};

exports.DeleteCustomer = (req, res, next) => {
    const CusId = req.params.id;
    Purchase.updateMany({ customer: CusId }, { $set: { customer: null } }, function(err) {
        if (err) {
          console.log(err);
        }});
    Customers.findById(CusId).then(Customer => {
        Customer.deleteOne().then(() => {
            res.redirect('/customers');
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    }
    )
}