const express = require('express');
const router = express.Router();
const gravatar =  require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
const User = require('../../model/User');
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'enter a password with 6 or greater').isLength({min:6})
], async(req, res) => {

   const errors = validationResult(req);
   if(!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
const {name, email, password} = req.body;
try {
    //see if user exists
let user = await User.findOne({ email});
if(user){
   return res.status(400).json({errors: [{msg: 'user already exists'}]});
}

    //Get users gravatar
const avatar= gravatar.url(email,{
    s:'200',
    r:'pg',
    d:'mm'
});
user = new User({
    name,
    email,
    avatar,
    password
});
    //encrypt passsword
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);

await user.save();

    //return json webtoken
    const payload = {
        user:{
            id: user.id
        }
    }

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