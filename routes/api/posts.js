const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const auth = require('../../middleware/auth');


const Post = require('../../model/Post');
const Profile = require('../../model/Profile');
const User = require('../../model/User');

// @route  POST api/posts
// @desc  creta a post route
// @access Private
router.post('/:id',[auth,[
    check('text','Text is required').not().isEmpty()

]], async(req , res) =>{
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
}
try {
    const user = await User.findById(req.user.id).select('-password');
const newPost = new Post( {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
    group: req.params.id

});
const post = await newPost.save();
res.json(post);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}

} );
// @route  GET api/posts
// @desc  get all posts
// @access Private
router.get('/:id',auth,async(req,res)=> {
try {
    const posts = await Post.find({group : req.params.id}).sort({date: -1});
    res.json(posts);
    
} catch (error) {
    console.error(error.message);
    return res.status(500).send('server error');
    
}
});
// @route  GET api/posts/:id
// @desc  get  post by id
// @access Private
router.get('/:id',auth,async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({msg: 'post not found'});
        }

        res.json(post);
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'post not found'});
        }
        return res.status(500).send('server error');
        
    }
    });
// @route  DELETE api/posts/:id
// @desc  get  post by id
// @access Private
router.delete('/:id',auth,async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({msg: 'post not found'});
        }
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'not authorized'});
        }
        await post.remove();
        res.json({msg: 'post removed'});
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'post not found'});
        }
        return res.status(500).send('server error');
        
    }
    });
// @route  PUT api/posts/like/:id
// @desc  like a post
// @access Private
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg : 'Post already liked'});
        }
        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(await Post.find());
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'post not found'});
        }
        return res.status(500).send('server error');
    }
});
// @route  PUT api/posts/unlike/:id
// @desc  like a post
// @access Private
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg : 'Post has not ye been liked'});
        }
        
        const removeindex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeindex,1);
        await post.save();
        res.json(await Post.find());
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'post not found'});
        }
        return res.status(500).send('server error');
    }
});

// @route  POST api/posts/comment/:id
// @desc  comment on a post route
// @access Private
router.post('/comment/:id',[auth,[
    check('textt','Text is required').not().isEmpty()

]], async(req , res) =>{
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
}
try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    const newComment =  {
    text: req.body.textt,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id

};
post.comments.unshift(newComment);
 await post.save();
res.json(await Post.find());
    
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}

} );

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc  delete comment
// @access Private
router.delete('/comment/:id/:comment_id',auth,async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id);
        
        if(!post) {
            return res.status(404).json({msg: 'post not found'});
        }
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if(!comment){
            return res.status(404).json({msg: 'comment not found'});
        }
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'not authorized'});
        }
        const removeindex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeindex,1);
        await post.save();
        res.json(await Post.find());
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'post not found'});
        }
        return res.status(500).send('server error');
        
    }
    });
module.exports = router;