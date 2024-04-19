const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CustomerSchema = new Schema({

    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    age:{type:Number,
        required:true
    },
    image: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        default: () => {
            let date = new Date();
            date.setHours(0, 0, 0, 0);
            return date;
        }
    }


})

                // 1st parameter is the name of the model in this case 'User'
module.exports = mongoose.model('Customer', CustomerSchema);
