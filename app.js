const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://srigayathirib2022it:sri246@cluster0.muluksr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
});

app.set("view engine","ejs");
app.use(bodyParser.json());
app.use("/",productRoutes);
app.use("/",userRoutes);
app.use("/",cartRoutes);

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});

module.exports = app;