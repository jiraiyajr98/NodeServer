const User = require('../models/User');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req,res)=>{

    const findUser = await User.findOne({email: req.body.email}); 

    if(findUser)
        return res.status(403).json({result: 'Error !! User already Registered'});

    const user =  new User(req.body);
    await user.save();
    res.json({result:'User is created Successfully'});
    

};


exports.signIn = (req,res) =>{

    const { email,password } = req.body;

    let user = null;
     user =  User.findOne({email}, (err,user)=>{

        //console.log('User '+ user);

        if(err || !user)
        {
            res.status(404).json({error:'No User found with the specified User Email'});
        }
        else if( !user.authenticate(password))
        {
            return res.status(401).json({error:'Incorrect Password'});
        }
        else
        {

        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);

        res.cookie("t",token, {expire: new Date() + 9999});

        const {_id, name , email } = user;

        res.json({ 

            token,

            user:{
                _id,
                name,
                email
                }

            });
        }

    });


};

exports.signOut = (req,res) =>{

    res.clearCookie("t");
    res.json({status:'SignOut Successful'})

};

exports.requireAuthentication = expressJwt(
    {
        secret: process.env.JWT_SECRET,
        userProperty: "auth"
    }
);
