const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Event = require('../../model/Event');
const {check, validationResult} = require('express-validator');

// @route  GET api/event/all
// @desc  get all events
// @access Private
router.get('/all',async(req , res) => {
    try {
        const events = await Event.find();
    
    res.json(events);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  GET api/event/details
// @desc  get event
// @access Private
router.get('/details/:id',auth,async(req , res) => {
    try {
        const event = await Event.findById(req.params.id);
        if(!event)
        {
            return res.status(400).json({msg:'There is no event'});
        }
    res.json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  POST api/event
// @desc  create or update a event
// @access Private
router.post('/',[auth,[
    check('title','title is required').not().isEmpty(),
    check('description','description is required').not().isEmpty(),
    check('place','place is required').not().isEmpty(),
    check('startDate','startDate is required').not().isEmpty(),
    check('endDate','endDate is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});   
     }
     const {
         title,
         description,
         place,
         startDate,
         endDate
     }= req.body;
     const eventFields = {};
     eventFields.user= req.user.id;
     if(title) eventFields.title=title;
     if(description) eventFields.description=description;
     if(place) eventFields.place=place;
     if(startDate) eventFields.startDate=startDate;
     if(endDate) eventFields.endDate=endDate;
     
try {
   let event = await Event.findOne({_id: req.query.id});
   if(event) {
    event = await Event.findOneAndUpdate({_id: req.query.id},{$set: eventFields}, {new: true});
    return res.json(event);
   }

   event = new Event(eventFields);
   await event.save();
   res.json(event)
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
    
}
});

// @route  DELETE api/event
// @desc  delete a event
// @access Private
router.delete('/:id', auth,async(req , res) => {
    try {
        const event = await Event.findOne({_id: req.params.id});
        if(!event)
        {
            return res.status(400).json({msg:'There is no event'});
        }
    await Event.remove(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;