const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PurchaseSchema = new Schema({

  customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: () => {
            let date = new Date();
            return date;
        }
    }



})

                // 1st parameter is the name of the model in this case 'User'
module.exports = mongoose.model('Purchase', PurchaseSchema);
