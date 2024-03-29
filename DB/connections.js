const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas connected successfully with wvServer((connection.js)) ");
}).catch((reason)=>{
    console.log(reason);
    console.log("Mongo DB Connection Faild ((connection.js))");
})