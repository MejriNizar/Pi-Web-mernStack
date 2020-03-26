const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../../model/User');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const mailer = require('../../misc/mailer');
const transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
const Profile = require('../../model/Profile');
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('role', 'role is required').not().isEmpty(),

    check('email', 'please include a valid email').isEmail(),
    check('password', 'enter a password with 6 or greater').isLength(
        {min: 6}
    )
], async (req, res) => {

    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password, role} = req.body;
    try { // see if user exists
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'user already exists'
                    }
                ]
            });
        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name,
            email,
            avatar,
            password,
            role
        });
        // encrypt passsword
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // generate secret token
        const secretToken = randomstring.generate(6);
        user.secretToken = secretToken;
        await user.save();
        // send email

        const html = `hi there, 
<br/>
thank you for regestering!
<br/><br/>
please verify you account<br/>
Token <b>${secretToken}</b>
<a href ="http://localhost:3000/verify">http://localhost:3000/verify</a>`;


        await mailer.sendMail('nizar.mejri@esprit.tn', user.email, 'please verify your account', html)

        // return json webtoken
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) 
                throw err;
            
            res.json({token});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server  error');

    }

});
// @route  GET api/users/all
// @desc  get all users
// @access Private
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route  GET api/users/allStudents
// @desc  get all students
// @access Private
router.post('/allStudents', async (req, res) => {
    try {
        const {skills} = req.body;
        if (skills) {
            console.log(skills)
            const profiles = await Profile.find({
                skills: {
                    "$in": skills
                }
                
            }, {
                skills: 0,
                _id: 0,
                company: 0,
                website: 0,
                location: 0,
                bio: 0,
                status: 0,
                experience: 0,
                education: 0,
                date: 0,
                __v: 0
            }).populate('user', ['name', 'email']);
            return res.json(profiles);
        } else {
            const users = await User.find({role: 'Student',group: {$exists:false}});
            return res.json(users);
        }


    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route  GET api/users/:_id
// @desc  get all students
// @access Private
router.get('/:id', async (req, res) => {
    try {

        const users = await User.find({_id: req.params.id, role: 'Student'});
        if (users) {
            return res.json(users);
        } else {
            return res.json({err: 'not found'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

module.exports = router;
