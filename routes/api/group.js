const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Group = require('../../model/Group');
const Project = require('../../model/Project');
const User = require('../../model/User');
const Affectation = require('../../model/Affectation');
const multer = require('multer');
const fileUpload=require('express-fileupload')


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "./images/");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });
  const upload = multer({storage: storage})
const {check, validationResult} = require('express-validator');
router.post('/upload',upload.single('image'),async (req,res,next) =>{
try {
    console.log(req.file)
    const obj={ name: req.body.name,image:req.file.path}
    
    res.json(obj)
} catch (error) {
    console.error(error.message);
        res.status(500).send('server error');
}
})
// @route  GET api/group/all
// @desc  get all groups
// @access Private
router.get('/all', auth, async (req, res) => {
    try {
        const groups = await Group.find().populate('project', ['name']).sort( { creationDate: -1 } ).populate('members',['name']);

        res.json(groups);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route  GET api/group/all
// @desc  get all groups limit
// @access Private
router.get('/alllimit', auth, async (req, res) => {
    try {
        const groups = await Group.find().populate('project', ['name']).sort( { creationDate: -1 } ).limit(4);

        res.json(groups);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  GET api/group/details
// @desc  get  group by id
// @access Private
router.get('/details/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id)
        const group = await Group.findOne({_id: req.params.id}).populate('members', ['name', 'email']).populate('project', ['name']);
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
router.post('/:id', [
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('name', 'name is bad').isAlpha(),
        check('name', 'enter a name with 6 or greater').isLength(
            {min: 6}
        ),
        
        check('slogan', 'slogan is required').not().isEmpty(),

    ]
], async (req, res) => {
  
console.log(req.files)
    const url = req.protocol + "://" + req.get("host");
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const {
        name,
        slogan,
        members,

    } = req.body;
    const groupFileds = {};
    const file = req.files.file;
    if(req.files){
       
        file.mv(`${__dirname}../../../client/public/images/${file.name}`,err =>{
            if(err) {
                console.error(err);
                return res.status(500).send(err)
            }
        
         
        })
    }
 
    
    
    groupFileds.groupOwner = req.user.id;
    groupFileds.members =req.user.id;
    
    if (name) 
        groupFileds.name = name;
    
        const logo='/images/'+file.name;

    if (logo) 
        groupFileds.logo = logo;
    


    if (slogan) 
        groupFileds.slogan = slogan;
    


    if (members) 
        groupFileds.members = members;
    


    groupFileds.project = req.params.id;
    
    groupFileds.creationDate = Date.now();


    try {

        let g = await Group.findOne({name});
        if (g) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'group already exists'
                    }
                ]
            });
        }
        group = new Group(groupFileds);
        await group.save();
        user = await User.findOneAndUpdate({
            _id: req.user.id
        }, {
            $set: {group: group._id}
        }, {new: true});
        const project = await Project.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                group: group.id
            }
        }, {new: false});
        res.json(project)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');

    }
});
// @route  PUT api/group
// @desc   update a group
// @access Private
router.put('/:id', multer({ storage: storage }).single("image"), [
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('logo', 'logo is required').not().isEmpty(),
        check('slogan', 'slogan is required').not().isEmpty()
    ]
], async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name, slogan, members} = req.body;
    const logo=url + "/images/" + req.file.filename;
    const groupFileds = {};
    // projectFileds.projectOwner= req.user.id;
    if (name) 
        groupFileds.name = name;
    


    if (logo) 
        groupFileds.logo = logo;
    


    if (slogan) 
        groupFileds.slogan = slogan;
    


    
    
        

    try {
        members.forEach(async (element) => {
            const userFileds = {};
            userFileds.invitation = {};
            userFileds.invitation.groupe = req.params.idG;
            userFileds.invitation.groupeName = group.name;
            console.log(group)


             await User.findOneAndUpdate({
                _id: element
            }, {
                $push: {
                    invitation: userFileds.invitation
                }
            });
        });

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
// @route  POST api/group/assign
// @desc  assign a group to project
// @access Private
router.post('/assign/:idG/:idP', auth, async (req, res) => {
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
router.put('/assign/:idG', auth, async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {members} = req.body;
        members.forEach(async (element) => {
            const userFileds = {};
            userFileds.invitation = {};
            userFileds.invitation.groupe = req.params.idG;
            userFileds.invitation.groupeName = group.name;
            console.log(group)


            const user = await User.findOneAndUpdate({
                _id: element
            }, {
                $push: {
                    invitation: userFileds.invitation
                }
            });


            return res.json(user);
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route  PUT api/group/request/:id
// @desc  send  request to group
// @access Private
router.put('/request/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const user = User.findOne({_id: req.user.id})
    try {
      
        const groupFileds = {};
        groupFileds.request = {};
        groupFileds.request.user = req.user.id;
        groupFileds.request.userName = user.name;
            const group = await Group.findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    request: groupFileds.request
                }
            });


            return res.json(group);
       

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
        const user = await User.findOne({_id: req.user.id});
        const {etat} = req.body;
        if (etat) {
            

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
            
            const user1 = await User.findOneAndUpdate({
                _id: user._id
            }, {
                $pull: {
                    invitation: {
                        _id: req.params.id
                    }
                },
                $set: {
                    group: req.params.id
                }

            });
            return res.json(user1);

        } else {
            const user2 = await User.findOneAndUpdate({
                _id: user._id
            }, {
                $pull: {
                    invitation: {
                        _id: req.params.id
                    }
                }
            });
            return res.json(user2);

        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});


// @route  PUT api/group/accpterReq/:id
// @desc  request  to group
// @access Private
router.put('/accpterReq/:idG/:idI', auth, async (req, res) => {
    try {
        const group = await Group.findOne({_id: req.params.idG})
        const {etat} = req.body;
        if (etat) {
            

            group.request.forEach(async (element) => {
                if (element._id == req.params.idI) {
                    console.log(element.user)
                     await Group.findOneAndUpdate({
                        _id: req.params.idG
                    }, {
                        $push: {
                            members: element.user
                        },
                        $pull: {
                            request: {
                                _id: req.params.idI
                            }
                        }
                    }, {new: false});
                     await User.findOneAndUpdate({
                        _id: element.user
                    }, {
                        
                        $set: {
                            group: req.params.idG
                        }
        
                    });
                    return res.json(group);

                }
            })
            
            

        } else {
            await Group.findOneAndUpdate({
                _id: req.params.idG
            }, {
                $pull: {
                    request: {
                        _id: req.params.idI
                    }
                }
            }, {new: false});
            return res.json(group);

        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});



// @route  POST api/group/voteReq/:id
// @desc  submit a vote
// @access Private
router.post('/voteReq/:id',auth,async(req,res)=>{
    try {

        
       const user=await User.findOne({_id:req.user.id})
      await Group.findOne({_id: req.params.id}).then(group => {
        const newVote = {
            title:req.body.title,
          object:req.body.object,
          user:req.user.id,
          userName:user.name
        };
        group.Vote_Request.unshift(newVote);
  
        group.save().then(group => res.json(group));
      });
      

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route  POST api/group/vote/:idG/:idr
// @desc  vote
// @access Private
router.post('/vote/:idG/:idr',auth,async(req,res)=>{
    try {

        let response=0;
if(req.body.response==='yes'){
    response=1
    await Group.updateOne(
    { _id: req.params.idG, "Vote_Request._id":req.params.idr  },
    { $inc: { "Vote_Request.$.resultat" : 1 } }
 )}
if(req.body.response==='no'){
    response=-1
    await Group.updateOne(
    { _id: req.params.idG, "Vote_Request._id":req.params.idr  },
    { $inc: { "Vote_Request.$.resultat" : -1 } }
 )}
      await User.findOne({_id:req.user.id}).then(user => {
          
                const newVote = {
                    vote_request:req.params.idr,
                    response:response
                  };
                  user.votes.unshift(newVote);
          user.save().then(user => res.json(user))
      })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;
