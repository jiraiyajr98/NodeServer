const controller = require('../controller/postController');
const  postvalidator  = require('../utils/postValidator');

const express = require('express');

const router = express.Router();


router.get('/',controller.getPostRoute);

router.post('/post',postvalidator.postValidatorCallback,
  controller.postPostRoute);

module.exports = {

    router 

};
