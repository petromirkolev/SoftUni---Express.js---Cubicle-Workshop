const jwt = require('jsonwebtoken');
const { cookie, secret } = require('../config/config');

module.exports = () => {
    return (req, res, next) => {
        let token = req.cookies[cookie];
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.clearCookie(cookie);
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isLogged = true;
                } 
            })
        }
        next();
    }
}