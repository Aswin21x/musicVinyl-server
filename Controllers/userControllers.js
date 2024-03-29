const users = require('../Model/userModels')
const jwt = require('jsonwebtoken')

//register

exports.register = async (req,res)=>{
    console.log("INSIDE REG API");
    const {username,email,password}= req.body
console.log(username,email,password);
try{
    const existingUser = await users.findOne({email})
    console.log(existingUser);
    if(existingUser){
        res.status(406).json("Account already exists")

    }else{
        //add user to collections
        const newUser = new users({
            username,
            email,
            password
        })
await newUser.save()
res.status(200).json(newUser)
    }

}catch(err){
    res.status(401).json(err)
}

}

//login
exports.login = async (req,res)=>{
    console.log("INSIDE login API");
    const {email,password}= req.body
console.log(email,password);
try{
    const existingUser = await users.findOne({email,password})
    console.log(existingUser);
    if(existingUser){
    //exist user allow loginn
        const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
        res.status(200).json({existingUser,token})
    }else{
        res.status(404).json("Invalid Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

