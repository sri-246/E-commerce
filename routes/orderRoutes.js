 const express = require('express');
 const Router = express.Router();
 const orderController = require('../controllers/orderController');
 const auth = require('../Middleware/auth');

 Router.post('/orders',auth,orderController.manageOrder);


 module.exports = Router;