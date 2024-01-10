const express = require('express');
const router = express.Router();
const products = require('../services/products');

router.get('/', async (req, res, next) => {
    try {
        page = req.query.page || 1;
        size = req.query.size || 10;
        res.json(await products.getMultiple(page, size));
    } catch (err) {
        console.error(`Error while getting products `, err.message);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await products.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

router.get('/sku/:sku', async (req, res, next) => {
    try {
        res.json(await products.getBySKU(req.params.sku));
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        res.json(await products.create(req.body.sku, req.body.name, req.body.in_stock));
    } catch (err) {
        console.error(`Error while creating product `, err.message);
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        res.json(await products.update(req.params.id, req.body.sku, req.body.name, req.body.in_stock));
    } catch (err) {
        console.error(`Error while updating product `, err.message);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await products.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting product `, err.message);
        next(err);
    }
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({ message: err.message });
});

module.exports = router;
