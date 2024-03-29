const cartdatas = require('../Model/cartModel')

//add to cart

exports.addToCartController = async (req,res)=>{
    const {title,price,images,albumid,quantity} =req.body
    const userId = req.payload
    

    try{
        const existingProduct = await cartdatas.findOne({albumid,userId})
        console.log(existingProduct);
        if(existingProduct){
            if (existingProduct.quantity<2){
                existingProduct.quantity+=1
                existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
                await existingProduct.save()
                res.status(200).json("Items added successfully")
            }else{
                res.status(400).json("Maximum Quantity Reached")
            }

        }else{
            const newQuantity = Math.min(quantity,2)
            const newProduct = new cartdatas({
                title,price,images,albumid,quantity:newQuantity,totalPrice:price,userId
            })
            await newProduct.save()
             res.status(200).json("Item added successfully")
        }

    }catch(err){
         res.status(401).json(err)
    }
}

//get cart items
exports.getCartController = async (req,res)=>{
    const userId = req.payload
    try{
        const allProducts = await cartdatas.find({userId})
        res.status(200).json(allProducts)

    }catch(err){
        res.status(401).json(err)
    }
}

//remove cart item
exports.removeCartContoller = async (req,res)=>{

    const {id} = req.params
    try{
        const removeProducts = await cartdatas.findByIdAndDelete({_id:id})
        res.status(200).json(removeProducts)

    }catch(err){
        res.status(401).json(err)

    }
}

//increment cart quqntity

exports.incrementItem = async (req,res)=>{
    const {id} = req.params
    try{
        const selectedProducts = await cartdatas.findOne({_id:id})
        if(selectedProducts.quantity<2){
            selectedProducts.quantity+=1
        selectedProducts.totalPrice = selectedProducts.quantity*selectedProducts.totalPrice
        await selectedProducts.save()
        res.status(200).json(selectedProducts)
        }else {
            res.status(400).json("Maximum Quantity Reached");
        }
        

    }catch(err){
        res.status(401).json(err)

    }
}


//decrement cart quqntity
exports.decrementItem = async (req,res)=>{
    const {id} = req.params
    try{
        const selectedProducts = await cartdatas.findOne({_id:id})
        selectedProducts.quantity-=1
        if (selectedProducts.quantity==0) {
            await cartdatas.deleteOne({_id:id})
            res.status(200).json("Quantity Updated") 
        }else{
            selectedProducts.totalPrice = selectedProducts.quantity*selectedProducts.totalPrice
            await selectedProducts.save()
            res.status(200).json(selectedProducts)
            
        }
   

    }catch(err){
        res.status(401).json(err)

    }
}
