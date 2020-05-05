const express = require('express');
const router = express.Router();
const Task=require('../../model/Task')
const {check,validationResult} = require('express-validator');



// @route  POST api/task/:idg/:idp
// @desc  add new TAsk
// @access Private
router.post('/:idg/:idp', async (req,res)=>{
    const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
}
try {
    const {name}=req.body
    const task = await Task.findOne({name})
    if(task){
        return res.status(400).json({
            errors: [
                {
                    msg: 'Task already exists'
                }
            ]
        });
    }
    const newTask= new Task();
    newTask.name=name;
    newTask.group=req.params.idg
    newTask.project=req.params.idp
    newTask.save();
    res.json(newTask);
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}

});
router.get('/all',async (req,res)=>{
    try {
        const tasks= await Task.find();
        return res.json(tasks)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
router.put('/:id',async (req,res)=>{
    try {

        const task = await Task.findById({'_id':req.params.id});
        if(!task){
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Task not existant'
                    }
                ]
            });
        }
        const {etat}=req.body
     const taskupdated =   await Task.findOneAndUpdate({'_id': req.params.id},{$set:{'etat':etat}});
return res.json(taskupdated)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;