const controller = require('../controller/authenticationController');
//const  postvalidator  = require('../utils/postValidator');

const express = require('express');

const authRouter = express.Router();


//router.get('/',controller.getPostRoute);

authRouter.post('/signUp',
  controller.signUp);

module.exports = {

    authRouter 

};