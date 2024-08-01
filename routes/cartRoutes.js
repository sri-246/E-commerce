const express = require('express');
const Router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../Middleware/auth');

// Add a product to the cart
Router.post('/cart/add',auth,cartController.addtoCart);
Router.get('/cart/display',auth,cartController.getCart);
Router.delete('/cart/delete',auth,cartController.deleteProducts);

module.exports = Router;