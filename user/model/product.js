const mongoose = require("mongoose");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    categoryID:{
        type: mongoose.Types.ObjectId,
        ref: "Categories",
        required:true    
    },
    availableQuantity:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    sellerID:{
        type: mongoose.Types.ObjectId,
        ref: "Users",
        rquired: true
    },
    images:{
        type: String,
        required: true
    }
});

const Product = mongoose.model("Products",productSchema);

module.exports=Product;