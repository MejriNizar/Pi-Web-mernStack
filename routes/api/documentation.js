const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Documentation = require('../../model/Documentation');
const {check, validationResult} = require('express-validator');

// @route  GET api/documentation/all
// @desc  get all documentations
// @access Private
router.get('/all',auth,async(req , res) => {
    try {
        const documentations = await Documentation.find();
    
    res.json(documentations);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  GET api/documentations/details
// @desc  get all documentations
// @access Private
router.get('/details',auth,async(req , res) => {
    try {
        const documentation = await Documentation.findOne({_id: req.query.id});
        if(!documentation)
        {
            return res.status(400).json({msg:'There is no documentation'});
        }
    res.json(documentation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  POST api/documentation
// @desc  create or update a documentation
// @access Private
router.post('/',[auth,[
    check('label','label is required').not().isEmpty(),
    check('description','description is required').not().isEmpty(),
    check('content','content is required').not().isEmpty(),
]],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});   
     }
     const {
         label,
         description,
         content,
        
     }= req.body;
     const documentationFields = {};
     //projectFileds.projectOwner= req.user.id;
     if(label) documentationFields.label=label;
     if(description) documentationFields.description=description;
     if(content) documentationFields.content=content; 
try {
   let documentation = await Documentation.findOne({_id: req.query.id});
   if(documentation) {
    documentation = await Documentation.findOneAndUpdate({_id: req.query.id},{$set: documentationFields}, {new: true});
    return res.json(documentation);
   }

   documentation = new Documentation(documentationFields);
   await documentation.save();
   res.json(documentation)
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}
});

// @route  DELETE api/documentation
// @desc  delete a documentation
// @access Private
router.delete('/', auth,async(req , res) => {
    try {
        const documentation = await Documentation.findOne({id: req.query.id});
        if(!documentation)
        {
            return res.status(400).json({msg:'There is no documentation'});
        }
    await Documentation.remove(documentation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;