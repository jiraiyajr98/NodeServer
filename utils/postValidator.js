
exports.postValidatorCallback = (req,res,next) =>{

    req.check('title','Title Must be within 5 to 20 characters long').isLength({

        min:5,
        max:20

    });

    req.check('body','Body Must be within 5 to 20 characters long').isLength({

        min:10,
        max:100

    });

    const errors = req.validationErrors();

    if(errors)
    {
      
        return res.status(400).json({

            error: errors.map((error)=>error.msg)[0]

        });
    }
    
    next();
};