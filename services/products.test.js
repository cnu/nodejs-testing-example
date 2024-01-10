const assert = require('assert/strict');
const sinon = require('sinon');
const db = require('./db');
const helper = require('../helper');
const { getMultiple, getOne, getBySKU, create, update, remove } = require('./products');

describe('getMultiple', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return the multiple products and meta', async () => {
        const page = 1;
        const size = 10;
        const offset = helper.getOffset(page, size);
        const rows = [
            { id: 1, name: 'Product 1', in_stock: true },
            { id: 2, name: 'Product 2', in_stock: false },
            // Add more sample data if needed
        ];
        const expectedData = helper.emptyOrRows(rows);
        const expectedMeta = { page, size };

        sinon.stub(helper, 'getOffset').returns(offset);
        sinon.stub(db, 'query').resolves(rows);

        const result = await getMultiple(page, size);

        assert.deepEqual(result.data, expectedData);
        assert.deepEqual(result.meta, expectedMeta);
        sinon.assert.calledOnceWithExactly(helper.getOffset, page, size);
        sinon.assert.calledOnceWithExactly(db.query, 'SELECT id, sku, name, in_stock FROM products LIMIT ?,?', [offset, size]);
    });
});

describe('getOne', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return the one product', async () => {
        const id = 1;
        const row = { id: 1, name: 'Product 1', in_stock: true };
        const expectedData = helper.emptyOrRows(row);

        sinon.stub(db, 'query').resolves(row);

        const result = await getOne(id);

        assert.deepEqual(result.data, expectedData);
        sinon.assert.calledOnceWithExactly(db.query, 'SELECT id, sku, name, in_stock FROM products WHERE id=?', [id]);
    });
});

describe('getBySKU', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return the product with the given SKU', async () => {
        const sku = 'ABC123';
        const row = { id: 1, name: 'Product 1', in_stock: true };
        const expectedData = helper.emptyOrRows(row);

        sinon.stub(db, 'query').resolves(row);

        const result = await getBySKU(sku);

        assert.deepEqual(result.data, expectedData);
        sinon.assert.calledOnceWithExactly(db.query, 'SELECT id, sku, name, in_stock FROM products WHERE sku=?', [sku]);
    });
});

describe('create', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should create a product successfully', async () => {
        const sku = 'ABC123';
        const name = 'Test Product';
        const in_stock = true;
        const result = { affectedRows: 1 };

        sinon.stub(db, 'query').resolves(result);

        const expectedResult = { message: 'Product created successfully' };
        const actualResult = await create(sku, name, in_stock);

        assert.deepEqual(actualResult, expectedResult);
        sinon.assert.calledOnceWithExactly(db.query, 'INSERT INTO products (sku, name, in_stock) VALUES (?, ?, ?)', [sku, name, in_stock]);
    });

    it('should handle error in creating a product', async () => {
        const sku = 'ABC123';
        const name = 'Test Product';
        const in_stock = true;
        const result = { affectedRows: 0 };

        sinon.stub(db, 'query').resolves(result);

        const expectedResult = { message: 'Error in creating product' };
        const actualResult = await create(sku, name, in_stock);

        assert.deepEqual(actualResult, expectedResult);
        sinon.assert.calledOnceWithExactly(db.query, 'INSERT INTO products (sku, name, in_stock) VALUES (?, ?, ?)', [sku, name, in_stock]);
    });
});

describe('update', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should update a product successfully', async () => {
        const id = 1;
        const sku = 'ABC123';
        const name = 'Updated Product';
        const in_stock = true;
        const result = { affectedRows: 1 };

        sinon.stub(db, 'query').resolves(result);

        const expectedResult = { message: 'Product updated successfully' };
        const actualResult = await update(id, sku, name, in_stock);

        assert.deepEqual(actualResult, expectedResult);
        sinon.assert.calledOnceWithExactly(db.query, 'UPDATE products SET sku=?, name=?, in_stock=? WHERE id=?', [sku, name, in_stock, id]);
    });

    it('should handle error in updating a product', async () => {
        const id = 1;
        const sku = 'ABC123';
        const name = 'Updated Product';
        const in_stock = true;
        const result = { affectedRows: 0 };

        sinon.stub(db, 'query').resolves(result);

        const expectedResult = { message: 'Error in updating product' };
        const actualResult = await update(id, sku, name, in_stock);

        assert.deepEqual(actualResult, expectedResult);
        sinon.assert.calledOnceWithExactly(db.query, 'UPDATE products SET sku=?, name=?, in_stock=? WHERE id=?', [sku, name, in_stock, id]);
    });
});

describe('remove', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should delete a product successfully', async () => {
        const id = 1;
        const result = { affectedRows: 1 };

        sinon.stub(db, 'query').resolves(result);

        const expectedResult = { message: 'Product deleted successfully' };
        const actualResult = await remove(id);

        assert.deepEqual(actualResult, expectedResult);
        sinon.assert.calledOnceWithExactly(db.query, 'DELETE FROM products WHERE id=?', [id]);
    });

    it('should handle error in deleting a product', async () => {
        const id = 1;
        const result = { affectedRows: 0 };

        sinon.stub(db, 'query').resolves(result);

        const expectedResult = { message: 'Error in deleting product' };
        const actualResult = await remove(id);

        assert.deepEqual(actualResult, expectedResult);
        sinon.assert.calledOnceWithExactly(db.query, 'DELETE FROM products WHERE id=?', [id]);
    });
});

