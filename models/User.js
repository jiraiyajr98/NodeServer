const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
      
    },
    email:{

        type: String,
        required: true,
        trim: true
    },
    hashed_password:{

        type: String,
        required: true
    },
    created:{

        type: Date,
        default: Date.now
    },

    updated: Date,
    salt: String

});

userSchema.virtual('password')
.set(function(password){

    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);

})
.get(function(){

    this._password;

});

userSchema.methods = {

    encryptPassword: function(password)
    {
        return crypto.createHmac('sha256', this.salt)
        .update(password)
        .digest('hex');
    }

}

module.exports = mongoose.model("User",userSchema);
