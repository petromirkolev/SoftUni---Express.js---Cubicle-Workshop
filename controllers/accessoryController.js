const { Router } = require('express');
const router = Router();
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('createAccessory', { title: 'Create an accessory' });
});

router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});

module.exports = router;