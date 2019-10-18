const User = require('../models/User');

exports.signUp = async (req,res)=>{

    const findUser = await User.findOne({email: req.body.email}); 

    if(findUser)
        return res.status(403).json({result: 'Error !! User already Registered'});

    const user =  new User(req.body);
    await user.save();
    res.json({result:'User is created Successfully'});
    

};