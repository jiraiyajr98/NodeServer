const controller = require('../controller/postController');

const express = require('express');

const router = express.Router();

router.get('/',controller.testPostRoute);

module.exports = {

    router

};
