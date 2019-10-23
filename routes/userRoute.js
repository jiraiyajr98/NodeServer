const userController = require('../controller/userController');
const authController = require('../controller/authenticationController');

const express = require('express');

const userRouter = express.Router();

userRouter.get('/users',  userController.allUsers);
userRouter.get('/user/:userId', authController.requireAuthentication , userController.getUser);
userRouter.put('/user/:userId', authController.requireAuthentication , userController.updateUser);
userRouter.delete('/user/:userId', authController.requireAuthentication , userController.deleteUser);

userRouter.param("userId",userController.userId);

module.exports = {

    userRouter 
  
  };