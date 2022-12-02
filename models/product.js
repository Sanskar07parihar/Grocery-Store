// import mongoose
const mongoose = require('mongoose')

// define schema for a Region
var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Product name is required'
    },
    quantity: {
        type: String,
        required: 'Quantity is required'
    },
    price: {
        type: String,
        required: 'Price is required'
    }
})

// make public 
module.exports = mongoose.model('Product', productSchema)