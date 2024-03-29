const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema ({
    title:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
        required:true
    },
    
    images:{
        type:String,
        required:true
    },
  
    albumid:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    userId:{
    type:String,
    required:true
    }
})

const cartdatas = mongoose.model("cartdatas",cartSchema)
module.exports = cartdatas