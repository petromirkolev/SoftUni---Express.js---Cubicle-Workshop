const { Router } = require('express');
const { route } = require('./homeController');
let productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', (req, res) => {

    let data = req.body;
    productService.create(data);
    res.redirect('/products');
});

router.get('/details/:id', (req, res) => {
    console.log(req.params.id);
    res.render('details', { title: 'Details' });
});


module.exports = router; 