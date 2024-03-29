const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userControllers')
const adminController = require('../Controllers/adminController')
const multerConfig = require('../Middleware/multerMiddleware')
const cartController = require('../Controllers/cartController')
const jwtMiddleware =  require('../Middleware/jwtMiddleware')
//routes fo addind data admin
router.post('/display-data',multerConfig.single('images'),adminController.displayAdminData)

//routes to get admin DIsplay Data
router.get('/get-display-data',adminController.getAdminDisplayData)

//routes to get admin info data
router.get('/get-info-data/:id',adminController.getAdminInfoData)

router.post('/add-to-cart',jwtMiddleware,cartController.addToCartController)

router.get('/get-cart-data',jwtMiddleware,cartController.getCartController)
//remove cart
router.delete('/remove-cart/:id',jwtMiddleware,cartController.removeCartContoller)
//incre
router.get('/cart-increment/:id',jwtMiddleware,cartController.incrementItem)
//decre
router.get('/cart-decrement/:id',jwtMiddleware,cartController.decrementItem)

//------------------//




//register api
router.post('/register',userController.register) 

//login
router.post('/login',userController.login)

//exporting router
module.exports = router