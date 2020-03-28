const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');


// @route  GET api/auth
// @desc  Test route
// @access Public
router.get('/',auth, async(req , res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('group',['request']);
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server message');
    }
});

// @route    POST api/auth/act
// @desc     verfier  user 
// @access   Public
router.post('/act', async(req,res) => {
   try{
        const {secretToken} = req.body;
        const user = await User.findOne({ secretToken });
    if(!user){
        return res 
        .status(400)
        .json({errors: [{msg: 'invalid credentials'}]});
  }
    user.activated=true
    user.secretToken='';
    await user.save();
        console.log(secretToken);
    res.json(secretToken);

   }catch(err){console.error(error.message);
    res.status(500).send('server message');}
});

// @route    POST api/auth
// @desc     Authenticate  user & get token
// @access   Public
router.post('/',[
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password required').exists()
], async(req, res) => {

   const errors = validationResult(req);
   if(!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
const { email, password} = req.body;

try {
    //see if user exists
let user = await User.findOne({ email });
if(!user){
   return res 
   .status(400)
   .json({errors: [{msg: 'invalid credentials'}]});
}
if(user.activated === false) {
    return res 
   .status(400)
   .json({errors: [{msg: 'account is disabeld'}]});
}
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch) {
    return res
    .status(400)
    .json({errors: [{msg: 'invalid credentials'}]});
 }
    const payload = {
        user:{
            id: user.id,
            role:user.role
        }
    };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err,token) => {
            if(err) throw err;
            res.json({token});
            }
            );

}catch(err){
    console.error(err.message);
    res.status(500).send('server  error');

}

});
module.exports = router;