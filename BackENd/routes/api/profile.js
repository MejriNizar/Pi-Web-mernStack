const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const User = require('../../model/User');
const config = require('config');
const request = require('request');
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
         linkedin,
         facebook
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
    profileFileds.social = {};
    if(youtube) profileFileds.social.youtube = youtube;
    if(twitter) profileFileds.social.twitter = twitter;
    if(instagram) profileFileds.social.instagram = instagram;
    if(linkedin) profileFileds.social.linkedin = linkedin;
    if(facebook) profileFileds.social.facebook = facebook;

try {
    let profile = await Profile.findOne({user: req.user.id});

    if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFileds},
            {new:true});
            return res.json(profile);
    }
    profile = new Profile(profileFileds);
    await profile.save();
    return                                                                 res.json(profile);
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}


});
// @route  GET api/profile
// @desc  get all users profile
// @access Public
router.get('/',async (req,res) => {
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
        
    }
});

// @route  GET api/profile/user/:user_id
// @desc  get  profile by user id
// @access Public
router.get('/user/:user_id',async (req,res) => {
    try {
        const profile = await Profile
        .findOne({user: req.params.user_id})
        .populate('user',['name','avatar']);
        console.log(profile);
        if(!profile) {
            return res.status(400).json({msg: 'profile not found'});
            }
    res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile NOt Found'});


        }
        res.status(500).send('server error');
    }
});

// @route  DELETE api/profile
// @desc  delete  profile, user, post
// @access Public
router.delete('/',auth,async (req,res) => {
    try {
        //remove Profile
         await Profile
        .findOneAndRemove({user: req.user.id});
        await User
        .findOneAndRemove({_id: req.user.id});
        
       res.json({msg: 'User Deleted'})
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile NOt Found'});


        }
        res.status(500).send('server error');
    }
});

// @route  PUT api/profile/experience
// @desc  add profile experience
// @access Private
router.put('/experience',[auth,[
    check('title','title is requireed').not().isEmpty(),
    check('company','company is requireed').not().isEmpty(),
    check('from','from is requireed').not().isEmpty(),

]], async (req,res) => {
    const errors = validationResult(req);
    if( ! errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {
        title,company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(500).send('server error');
        
    }

});
// @route  DELETE api/profile/experience/:exp_id
// @desc  delete  experience from profile
// @access Private
router.delete('/experience/:exp_id',auth,async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
      const removeindex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeindex,1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile NOt Found'});


        }
        res.status(500).send('server error');
    }
});
// @route  PUT api/profile/education
// @desc  add profile education
// @access Private
router.put('/education',[auth,[
    check('school','school is requireed').not().isEmpty(),
    check('degree','degree is requireed').not().isEmpty(),
    check('from','from is requireed').not().isEmpty(),
    check('fieldofstudy','fieldofstudy is requireed').not().isEmpty(),

]], async (req,res) => {
    const errors = validationResult(req);
    if( ! errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(500).send('server error');
    }

});
// @route  DELETE api/profile/education/:edu_id
// @desc  delete  education from profile
// @access Private
router.delete('/education/:edu_id',auth,async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
      const removeindex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeindex,1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile NOt Found'});


        }
        res.status(500).send('server error');
    }
});
// @route  GET api/profile/github/:username
// @desc  get  user repos from github
// @access Public
router.get('/github/:username', (req,res)=>{

    try {
        const options = {
            uri:`https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githubClientId'
                )}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: {'user-agent':'node.js'}
        };

        request(options,(error,response,body)=>{
            if(error) console.error(error);

            if(response.statuscode !== 200) {
             return res.status(404).json({msg: 'No GitHub profile found'});
            }
            res.json(JSON.parse(body));
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
        
    }
});
module.exports = router;