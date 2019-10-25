const controller = require('../controller/postController');
const  postvalidator  = require('../utils/postValidator');
const authenticateRoute = require('../controller/authenticationController.js');
const userController = require('../controller/userController');

const express = require('express');

const postRouter = express.Router();


postRouter.get('/',  controller.getPostRoute);
postRouter.get('/post/:userId',  controller.getUserPosts);

postRouter.post('/post/new/:userId', authenticateRoute.requireAuthentication,
  controller.postPostRoute, postvalidator.postValidatorCallback);

postRouter.put('/post/updatePost/:postId',authenticateRoute.requireAuthentication, controller.upadatePost);  
postRouter.delete('/post/:postId', authenticateRoute.requireAuthentication, controller.isPoster ,
 controller.deleteUserPost);


postRouter.param("userId",  userController.userId);

postRouter.param('postId', controller.postId);

module.exports = {

  postRouter 

};
