const Router = require('express').Router();
const CustomersController = require('../controller/customer');

Router.get('/add-customer',CustomersController.getAddCustomer);
Router.post('/add-customer',CustomersController.postAddCustomer);

Router.get('/customers',CustomersController.getCustomers);

Router.get('/customer/:id',CustomersController.getCustomer);

Router.delete('/delete-customer/:id',CustomersController.DeleteCustomer);


module.exports = Router;
