const mongoose = require('mongoose')

const adminDisplaySchema = new mongoose.Schema({

title:{
    type:String,
    required:true
},

artist:{
    type:String,
    required:true
},

description:{
    type:String,
    required:true
},

category:{
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
tracklist:{
    type:String,
    required:true
},
albumid:{
    type:String,
    required:true
}

    
})

const admindatas = mongoose.model("admindatas",adminDisplaySchema)
module.exports = admindatas