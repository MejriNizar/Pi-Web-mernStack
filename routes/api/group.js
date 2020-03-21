const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Group = require('../../model/Group');
const Project = require('../../model/Project');

const {check, validationResult} = require('express-validator');

// @route  GET api/group/all
// @desc  get all groups
// @access Private
router.get('/all',auth,async(req , res) => {
    try {
        const groups = await Group.find();
    
    res.json(groups);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  GET api/group/details
// @desc  get all group
// @access Private
router.get('/details/:id',auth,async(req , res) => {
    try {
        const group = await Group.findOne({_id: req.params.id});
        if(!group)
        {
            return res.status(400).json({msg:'There is no group'});
        }
    res.json(group);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  POST api/group
// @desc  create  a group
// @access Private
router.post('/',[auth,[
    check('name','name is required').not().isEmpty(),
    check('logo','logo is required').not().isEmpty(),
    check('slogan','slogan is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});   
     }
     const {
         name,
         logo,
         slogan,
         members
         
     }= req.body;
     const groupFileds = {};
     //projectFileds.projectOwner= req.user.id;
     if(name) groupFileds.name=name;
     if(logo) groupFileds.logo=logo;
     if(slogan) groupFileds.slogan=slogan;
     if(members) groupFileds.members=members;
     
     
try {
   

   group = new Group(groupFileds);
   await group.save();
   res.json(group)
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}
});

// @route  PUT api/group
// @desc   update a group
// @access Private
router.put('/:id',[auth,[
    check('name','name is required').not().isEmpty(),
    check('logo','logo is required').not().isEmpty(),
    check('slogan','slogan is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});   
     }
     const {
         name,
         logo,
         slogan,
         members
         
     }= req.body;
     const groupFileds = {};
     //projectFileds.projectOwner= req.user.id;
     if(name) groupFileds.name=name;
     if(logo) groupFileds.logo=logo;
     if(slogan) groupFileds.slogan=slogan;
     if(members) groupFileds.members=members;

     
     
try {
   let group = await Group.findOne({_id: req.params.id});
   if(group) {
    group = await Group.findOneAndUpdate({_id: req.params.id},{$set: groupFileds}, {new: true});
    return res.json(group);
   }

   
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}
});

// @route  DELETE api/group
// @desc  delete a group
// @access Private
router.delete('/:id', auth,async(req , res) => {
    try {
        const group = await Group.findOne({_id: req.params.id});
        if(!group)
        {
            return res.status(400).json({msg:'There is no group'});
        }
    await Group.remove(group);
    const groups = await Group.find();
    
    res.json(groups);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route  DELETE api/group/assign
// @desc  assign a group to project
// @access Private
router.post('/assign/:idG/:idP',async(req , res) => {
    try {
        const group = await Group.findOne({_id: req.params.idG});
        const project = await Project.findOne({_id: req.params.idP});
        if(!group)
        {
            return res.status(400).json({msg:'There is no group'});
        }
        group1 = await Group.findOneAndUpdate({_id: req.params.idG},{$set: {project: project.id}}, {new: true});
        await Project.updateOne({_id: req.params.idP},{$set: {group: group.id}}, {new: true});
        res.json(group1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;