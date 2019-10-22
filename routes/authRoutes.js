const controller = require('../controller/authenticationController');
const userController = require('../controller/userController');
//const  postvalidator  = require('../utils/postValidator');

const express = require('express');

const authRouter = express.Router('../controller/authenticationController.js');


//router.get('/',controller.getPostRoute);

authRouter.post('/signUp',
  controller.signUp);

authRouter.post('/signIn',
  controller.signIn);

authRouter.get('/signOut',
controller.signOut);

authRouter.param("userId",userController.userId);


module.exports = {

    authRouter 

};