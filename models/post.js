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
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    psotedBy:{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    created:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Post",postSchema);
