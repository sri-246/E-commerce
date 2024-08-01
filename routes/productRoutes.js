const express = require('express');
const Router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../Middleware/auth");

Router.get("/products", auth, productController.getallProducts);
Router.post("/products", productController.postallProducts);
Router.put("/products/:id", productController.putallProducts);
Router.delete("/products/:id", productController.deleteallProducts);
module.exports = Router;