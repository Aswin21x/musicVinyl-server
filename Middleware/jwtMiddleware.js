const jwt = require('jsonwebtoken')


const jwtMiddleware = (req,res,next)=>{

    try{
        const token = req.headers['authorization'].split(" ")[1]
        if(token){
            const jwtResponse = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.payload = jwtResponse.userId
            console.log(req.payload);
            next()
        }else{

            res.status(406).json("Token not available")
        }

    }catch{
        res.status(401).json("Authorization Failed,Please Login")
    }
}

module.exports = jwtMiddleware