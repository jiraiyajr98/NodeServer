const controller = require('../controller/postController');
const  postvalidator  = require('../utils/postValidator');

const express = require('express');

const postRouter = express.Router();


postRouter.get('/',controller.getPostRoute);

postRouter.post('/post',postvalidator.postValidatorCallback,
  controller.postPostRoute);

module.exports = {

  postRouter 

};
