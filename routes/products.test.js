const assert = require('assert/strict');
const sinon = require('sinon');
const express = require('express');
const request = require('supertest');
const products = require('../services/products');
const router = require('./products');
// const app = require('../app');

describe('GET /products', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return multiple products and meta', async () => {
        const page = '1';
        const size = '10';
        const expectedData = { data: [], meta: { page, size } };

        sinon.stub(products, 'getMultiple').resolves(expectedData);

        const app = express();
        app.use('/', router);

        const response = await request(app).get('/').query({ page, size });

        assert.deepEqual(response.body, expectedData);
        sinon.assert.calledOnceWithExactly(products.getMultiple, page, size);
    });
});

describe('GET /products/:id', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return a single product', async () => {
        const id = '1';
        const expectedData = { data: {} };

        sinon.stub(products, 'getOne').resolves(expectedData);

        const app = express();
        app.use('/', router);

        const response = await request(app).get(`/${id}`);

        assert.deepEqual(response.body, expectedData);
        sinon.assert.calledOnceWithExactly(products.getOne, id);
    });
});

describe('GET /products/sku/:sku', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return a product with the given SKU', async () => {
        const sku = 'ABC123';
        const expectedData = { data: {} };

        sinon.stub(products, 'getBySKU').resolves(expectedData);

        const app = express();
        app.use('/', router);

        const response = await request(app).get(`/sku/${sku}`);

        assert.deepEqual(response.body, expectedData);
        sinon.assert.calledOnceWithExactly(products.getBySKU, sku);
    });
});

describe('POST /products', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should create a product successfully', async () => {
        const sku = 'ABC123';
        const name = 'Test Product';
        const in_stock = true;
        const expectedData = { message: 'Product created successfully' };

        sinon.stub(products, 'create').resolves(expectedData);

        const app = express();
        app.use(express.json());
        app.use('/', router);

        const response = await request(app)
            .post('/')
            .send({ sku, name, in_stock });

        assert.deepEqual(response.body, expectedData);
        sinon.assert.calledOnceWithExactly(products.create, sku, name, in_stock);
    });

});

describe('PUT /products/:id', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should update a product successfully', async () => {
        const id = '1';
        const sku = 'ABC123';
        const name = 'Updated Product';
        const in_stock = true;
        const expectedData = { message: 'Product updated successfully' };

        sinon.stub(products, 'update').resolves(expectedData);

        const app = express();
        app.use(express.json());
        app.use('/', router);

        const response = await request(app)
            .put(`/${id}`)
            .send({ sku, name, in_stock });

        assert.deepEqual(response.body, expectedData);
        sinon.assert.calledOnceWithExactly(products.update, id, sku, name, in_stock);
    });
});

describe('DELETE /products/:id', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should delete a product successfully', async () => {
        const id = '1';
        const expectedData = { message: 'Product deleted successfully' };

        sinon.stub(products, 'remove').resolves(expectedData);

        const app = express();
        app.use('/', router);

        const response = await request(app).delete(`/${id}`);

        assert.deepEqual(response.body, expectedData);
        sinon.assert.calledOnceWithExactly(products.remove, id);
    });
});