const express = require('express');
const app =express();
const PORT =3000 || env.process.PORT;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//tables || schemas 
const customers = require('./models/customers'); 
const products = require('./models/products'); 
const Purchase = require('./models/purchase'); 

app.set('view engine','ejs');
app.set('views','views');

//routes
app.use(methodOverride('_method'))

const customersRoutes = require('./routes/customers');
const productRoutes = require('./routes/products');
const purchaseRoutes = require('./routes/purchase');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(productRoutes);
app.use(purchaseRoutes);
app.use(customersRoutes);

app.get('/',(req,res,next) => {
      res.redirect('/customers');
   }
)









// the 'first' after the / is where you set in which db you want your collection to be created , in this case it is 'first'
//not the appName one but the one before it
 mongoose.connect('mongodb+srv://redyar:redyar2024@first.rlnuknb.mongodb.net/first?retryWrites=true&w=majority&appName=first').then((result) => {
    console.log('Connected!');
    app.listen
    (PORT,() => {
        console.log('Server is running on port 3000');
    });
 }).catch((err) => {
    
    console.log(err);
 });