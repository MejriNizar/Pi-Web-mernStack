const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
    //GEt token from header
    const token = req.header('x-auth-token');
    // check if no token
    if(!token) {
        return res.status(401).json({msg: 'no token '});
    }
    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:'token not valid'});
    }
};