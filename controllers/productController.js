const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const isAuth = require('../utils/isAuth');
const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Home', products });
        })
        .catch(() => res.status(500).end());
});

router.get('/create', isAuth, (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', isAuth, (req, res) => {
    let data = req.body;
    productService.create(data);
    res.redirect('/products');
});

router.get('/details/:id', async (req, res) => {
    let product = await productService.getOneWithAccessories(req.params.id);
    res.render('details', { title: 'Details', product });
});

router.get('/:id/attach', isAuth, async (req, res) => {
    let product = await productService.getOne(req.params.id);
    let accessories = await accessoryService.getAll();
    res.render('attachAccessory', { product, accessories });
});

router.post('/:id/attach', isAuth, (req, res) => {
    productService.attachAccessory(req.params.id, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.id}`))
        .catch(() => res.status(500).end());
});

router.get('/:id/edit', isAuth, (req, res) => {
    res.render('edit');
});
router.post('/:id/edit', isAuth, (req, res) => {

});

router.get('/:id/delete', isAuth, (req, res) => {
    productService.getOne(req.params.id)
        .then((cube) => {
            res.render('delete', { cube });
        })
        .catch((err) => {
            console.log(err);
        });
});
router.post('/:id/delete', isAuth, (req, res) => {
    productService.deleteOne(req.params.id)
        .then(response => res.redirect('/products'));
});

module.exports = router; 