const _ = require('lodash');
const User = require('../models/User');


exports.userId = (req,res,next,id) =>{

    User.findById(id).exec((err,user)=>{
        
        if(err || !user)
           return res.status(404).json({ error: 'User not found' });
        else if( user != null)
            req.profile = user;
        
        next();
    });

};

exports.hasAuthorization = (req,res,next) => {

    const authorized = 
    req.auth && req.profile && req.profile._id === req.auth._id;
    
    if(!authorized){

        return res.status(403).json({error: 'User not Authorized'});

    }
    

};

exports.allUsers = (req,res) =>{

    User.find((err,users)=>{

        if(err || !users)
            return res.status(404).json({ error: 'Error | Users not Found ' });
        else if( users != null )
            return res.json(users);

    }).select(" name email created updated ");

};

exports.getUser = (req,res) =>{

    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    res.json(req.profile);

};

exports.updateUser = (req,res) =>{

    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save((err)=>{

        if(err)
            return res.status.json({error:'Error | No Authorization'});
        else
        {
            user.salt = undefined;
            user.hashed_password = undefined;

            return res.json({user}); 
        }

    });

};