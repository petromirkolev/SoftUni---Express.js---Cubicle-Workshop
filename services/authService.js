const User = require('../models/User');
const bcrypt = require('bcrypt');
const { saltRounds, secret } = require('../config/config');
const jwt = require('jsonwebtoken');

const register = async ({ username, password }) => {

    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hash });
    return user.save();
}

const login = async ({ username, password }) => {

    let user = await User.findOne({ username });

    if (!user) throw ({ message: 'Invalid user' });

    let hasMatch = await bcrypt.compare(password, user.password);

    if (!hasMatch) throw ({ message: 'Password invalid' });

    let token = jwt.sign({ _id: user._id}, secret);

    return token;
}

module.exports = {
    register,
    login,
}