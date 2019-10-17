const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title:{
        type: String,
        required: 'Title is Required',
        minlength: 5,
        maxlength: 20
    },
    body:{

        type: String,
        required: 'Body is Required',
        minlength: 10,
        maxlength: 100
    }

});

module.exports = mongoose.model("Post",postSchema);
