const { Router } = require('express');
const authService = require('../services/authService');
const isAuth = require('../utils/isAuth');
const isGuest = require('../utils/isGuest')
const router = Router();
const { cookie } = require('../config/config');

router.get('/login', isGuest, (req, res) => {
    res.render('login');
})

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });
        res.cookie(cookie, token);
        res.redirect('/products');
    } catch (error) {
        res.render('login', { error });
    }
})

router.get('/register', isGuest, (req, res) => {
    res.render('register');
})

router.post('/register', isAuth, async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        return res.render('register', { message: 'Password mismatch' });
    }
    try {
        await authService.register({ username, password });
        res.redirect('/products');
    } catch (error) {
        res.render('register', { error });
    }
})
router.get('/logout', (req, res) => {
    
    res.clearCookie(cookie);
    res.redirect('/products');
})

module.exports = router;