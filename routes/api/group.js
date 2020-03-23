const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Group = require('../../model/Group');
const Project = require('../../model/Project');
const User = require('../../model/User');
const Affectation = require('../../model/Affectation');

const {check, validationResult} = require('express-validator');
// @route  GET api/group/all
// @desc  get all groups
// @access Private
router.get('/all', auth, async (req, res) => {
    try {
        const groups = await Group.find().populate('project', ['name']);

        res.json(groups);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  GET api/group/details
// @desc  get all group
// @access Private
router.get('/details/:id', auth, async (req, res) => {
    try {
        const group = await Group.findOne({_id: req.params.id}).populate('members', ['name', 'email']);
        if (! group) {
            return res.status(400).json({msg: 'There is no group'});
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
router.post('/', [
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('logo', 'logo is required').not().isEmpty(),
        check('slogan', 'slogan is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {
        name,
        logo,
        slogan,
        members,
        numberOfStudents,
        numberTolerence,
        skills,
        dueDate,
        votingSystem,
        requiredSkills


    } = req.body;
    const groupFileds = {};
    if (name) 
        groupFileds.name = name;
    

    if (logo) 
        groupFileds.logo = logo;
    

    if (slogan) 
        groupFileds.slogan = slogan;
    

    if (members) 
        groupFileds.members = members;
    

    groupFileds.project = null;
    groupFileds.settings = {};
    if (numberOfStudents) 
        groupFileds.settings.numberOfStudents = numberOfStudents;
    

    if (numberTolerence) 
        groupFileds.settings.numberTolerence = numberTolerence;
    

    if (skills) 
        groupFileds.settings.skills = skills;
    

    if (dueDate) 
        groupFileds.settings.dueDate = dueDate;
    

    if (votingSystem) 
        groupFileds.settings.votingSystem = votingSystem;
    

    if (typeof requiredSkills !== 'undefined') {
        groupFileds.settings.requiredSkills = requiredSkills.split(',');
    }


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
router.put('/:id', [
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('logo', 'logo is required').not().isEmpty(),
        check('slogan', 'slogan is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name, logo, slogan, members} = req.body;
    const groupFileds = {};
    // projectFileds.projectOwner= req.user.id;
    if (name) 
        groupFileds.name = name;
    

    if (logo) 
        groupFileds.logo = logo;
    

    if (slogan) 
        groupFileds.slogan = slogan;
    

    if (members) 
        groupFileds.members = members;
    


    try {
        let group = await Group.findOne({_id: req.params.id});
        if (group) {
            group = await Group.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: groupFileds
            }, {new: true});
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
router.delete('/:id', auth, async (req, res) => {
    try {
        const group = await Group.findOne({_id: req.params.id});
        if (! group) {
            return res.status(400).json({msg: 'There is no group'});
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
router.post('/assign/:idG/:idP', async (req, res) => {
    try {
        const group = await Group.findOne({_id: req.params.idG});
        const project = await Project.findOne({_id: req.params.idP});
        if (! group) {
            return res.status(400).json({msg: 'There is no group'});
        }
        group1 = await Group.findOneAndUpdate({
            _id: req.params.idG
        }, {
            $set: {
                project: project.id
            }
        }, {new: true});
        await Project.updateOne({
            _id: req.params.idP
        }, {
            $set: {
                group: group.id
            }
        }, {new: true});
        res.json(group1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;

// @route  PUT api/group/assign
// @desc  invit members to group
// @access Private
router.put('/assign/:idG', async (req, res) => {
    try {
        const {members} = req.body;
        members.forEach(async (element) => {
            const userFileds = {};
            userFileds.invitation = {};
            userFileds.invitation.groupe = req.params.idG;

           const user = await User.findOneAndUpdate({
                _id: element
            }, 
                { $push: { invitation: userFileds.invitation }
            });

            // //
            // const groupFileds = {};
            // if (members)
            // groupFileds.members = members;
            // const group = await Group.findOneAndUpdate({
            //     _id: req.params.idG
            // },
            //     { $push: { members: element }
            // }, {new: false});
            return res.json(user);
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  PUT api/group/accpterInv/:id
// @desc  assign members to group
// @access Private
router.put('/accpterInv/:id', auth, async (req, res) => {
    try {
        const {etat} = req.body;
        if (etat) {
            const userFileds = {};
            userFileds.invitation = {};
            userFileds.invitation.etat = etat;
            User.findOneAndUpdate({
                _id: req.user.id
            }, {$set: userFileds});
            const groupFileds = {};
            let user = await User.findOne({_id: req.user.id});
            user.invitation.forEach(async (element) => {
                if (element._id == req.params.id) {
                    console.log(element.groupe)
                    const group = await Group.findOneAndUpdate({
                        _id: element.groupe
                    }, {
                        $push: {
                            members: user._id
                        }
                    }, {new: false});


                }
            })

            await User.findOneAndUpdate({
                _id: user._id
            }, {
                $pull: {
                    invitation: {
                        _id: req.params.id
                    }
                }
            });

        } else {
            await User.findOneAndUpdate({
                _id: user._id
            }, {
                $pull: {
                    invitation: {
                        _id: req.params.id
                    }
                }
            });
            
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;
