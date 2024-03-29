//loads .env file content

require('dotenv').config()
const express = require ('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connections')

// express server
const mvServer = express()

// use cors in server
mvServer.use(cors())

//use json parse
mvServer.use(express.json())

//use router
mvServer.use(router)


//file/folder from server to other app
mvServer.use('/adminUploads',express.static('./adminUploads'))


const PORT = 3000 || process.env.PORT

// to host mvServer : locallhost:3000

mvServer.listen(PORT,()=>{
    console.log(`music vinyl server started at port :${PORT} ((index.js))`);
})

//to resolve  get http req to http req to http://locallhost:3000
mvServer.get('/',(req,res)=>{
    res.send(" <h1> Music Vinyl Server started... waiting for clint req </h1>")
})

