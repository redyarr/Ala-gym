const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }


})

                // 1st parameter is the name of the model in this case 'User'
module.exports = mongoose.model('products', ProductSchema);
