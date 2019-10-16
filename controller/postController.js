exports.testPostRoute = (req,res) => {
    res.json({
        postsArray: 
        [
            {postId:"POST 1"},
            {postId:"POST 2"},
            {postId:"POST 3"}
        ]
    });
};