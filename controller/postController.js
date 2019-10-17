const Post = require('../models/post');


exports.getPostRoute = (req,res) => {
    
    Post.find().select(' _id title body ')
    .then((posts)=>{ res.json({ posts }) })
    .catch((error)=>{ res.status(500).json({error: error.message})});

}; 

exports.postPostRoute = (req,res) =>{

    const postCreated = new Post(req.body);
    
    postCreated.save((err,success)=>{

        if(err)
        {
            res.status(400).json({
                error: err.message
            });
        }

        res.json({

            post:success

        });

    });

};