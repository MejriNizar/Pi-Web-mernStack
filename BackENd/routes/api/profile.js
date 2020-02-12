const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const User = require('../../model/User');
const {check, validationResult} = require('express-validator');
// @route  GET api/profile/me
// @desc  get current users profile
// @access Private
router.get('/me', auth,async(req , res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
    if(!profile)
    {
        return res.status(400).json({msg:'There is no Profile For this user'});
    }
    res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});


// @route  POST api/profile
// @desc  create or update a users profile
// @access Private
router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','skills is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});   
     }
     const {
         company,
         website,
         location,
         bio,
         status,
         gitHubUserName,
         skills,
         youtube,
         twitter,
         instagram,
         linkedin
     }= req.body;
     const profileFileds = {};
     profileFileds.user= req.user.id;
     if(company) profileFileds.company=company;
     if(website) profileFileds.website=website;
     if(location) profileFileds.location=location;
     if(bio) profileFileds.bio=bio;
     if(status) profileFileds.status=status;
     if(gitHubUserName) profileFileds.gitHubUserName=gitHubUserName;
     if(skills) {
         profileFileds.skills=skills.split(',').map(skill => skill.trim());
     }
     console.log(profileFileds.skills);
res.send('ok');

     

});
module.exports = router;