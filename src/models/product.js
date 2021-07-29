const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productId : {
        type: String,
        required:true
    },
    productName : {
        type: String,
        required:true
    },
    qtyPerUnit : {
        type: String,
        required:true
    },
    unitPrice : {
        type: String,
        required:true
    },
    unitInStock : {
        type: String,
        required:true
    },
    discontinued : {
        type: Boolean,
        required:true
    },
    categoryId : {
        type: String,
        required:true
    }
})

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;