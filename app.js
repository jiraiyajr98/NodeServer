const express = require('express');
const { router } = require('./routes/postRoutes');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//Configurations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 7894;

//DatabaseConnection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log("Connected to Database Successfully");
},(err)=>{
    console.log(`Error - ${err.message}`);  
});

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', router);


app.listen(PORT,()=>{console.log(`Running Service at ${PORT}`)});
