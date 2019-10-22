const controller = require('../controller/postController');
const  postvalidator  = require('../utils/postValidator');
const authenticateRoute = require('../controller/authenticationController.js');

const express = require('express');

const postRouter = express.Router();


postRouter.get('/',  controller.getPostRoute);

postRouter.post('/post', authenticateRoute.requireAuthentication, postvalidator.postValidatorCallback,
  controller.postPostRoute);

module.exports = {

  postRouter 

};
