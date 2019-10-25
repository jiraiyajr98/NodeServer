const _ = require('lodash');
const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');

exports.getPostRoute = (req,res) => {
    
    Post.find()
    .populate('postedBy', '_id name')
    .select(' _id title body ')
    .then((posts)=>{ res.json({ posts }) })
    .catch((error)=>{ res.status(500).json({error: error.message})});

}; 

exports.postPostRoute = (req,res) =>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields,files) =>{

        if(err)
        {
            return res.status(400).json({error:'Error Creating Post'});
        }
        else
        {
            let post = new Post(fields);

            req.profile.salt = undefined;
            req.profile.hashed_password = undefined;

            post.postedBy = req.profile;

            if(files.photo){
                post.photo.data = fs.readFileSync(files.photo.path);
                post.photo.contentType = files.photo.type;
            }

            post.save((err, result )=>{

                if(err)
                {
                    return res.status(400).json({error:'Error Creating Post'});
                }
                else
                {
                    return res.json(result);
                }

            });
        }

    });
 

};

exports.getUserPosts = (req,res) =>{

    Post.find({postedBy:req.profile._id})
    .populate('postedBy',"_id name")
    .sort('_created')
    .exec((err,posts)=>{

        if(err)
            return res.status(400).json({error:'Error Fetching Data'});
        else
            return res.json(posts);
    });

};

exports.postId = (req,res,next,id) =>{
    
    Post.findById(id)
    .populate('postedBy','_id name')
    .exec((err,posts)=>{
        
        if(err || !posts)
           return res.status(404).json({ error: 'Post not found' });
        else if( posts != null)
            req.post = posts;
        
        next();
    });

};

exports.deleteUserPost = (req,res) =>{

    let post = req.post;

    post.remove((err, post)=>{

        if(err)
            return res.status(400).json({err});
        else
            res.json({status: 'Post Deleted successfully'});

    });

};

exports.isPoster = (req,res, next) => {

    let status = req.post && req.auth && req.post.postedBy._id == req.auth._id;

    console.log(req.post.postedBy._id);
    console.log(req.auth._id);

    if(!status)
        return res.status(403).json({error:'Authorization Failed'});
    else
        next();
};


exports.upadatePost = (req,res) =>{

    let post = req.post;
    post = _.extend(post, req.body);
    post.updated = Date.now();
    post.save((err)=>{

        if(err)
            return res.status.json({error:'Error | No Authorization'});
      
        return res.json({post}); 
        

    });


};