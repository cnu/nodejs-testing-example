const db = require('./db');
const helper = require('../helper');

/**
 * Retrieves multiple products from the database.
 * 
 * @param {number} page - The page number to retrieve.
 * @param {number} size - The number of products per page.
 * @returns {Promise<{data: Array, meta: {page: number, size: number}}>} The retrieved products and metadata.
 */
async function getMultiple(page = 1, size=10) {
    const offset = helper.getOffset(page, size);
    const rows = await db.query(`SELECT id, sku, name, in_stock FROM products LIMIT ?,?`, [parseInt(offset), parseInt(size)]);
    const data = helper.emptyOrRows(rows);
    const meta = {page, size};

    return {
        data,
        meta
    }
}

/**
 * Retrieves a single product from the database based on the provided id.
 * 
 * @param {number} id - The id of the product to retrieve.
 * @returns {Promise<{data: Array}>} The retrieved product.
 */
async function getOne(id) {
    const row = await db.query(
        `SELECT id, sku, name, in_stock FROM products WHERE id=?`, 
        [id]
    );
    const data = helper.emptyOrRows(row);

    return {
        data
    }
}

/**
 * Retrieves a single product from the database based on the provided SKU.
 * 
 * @param {string} sku - The SKU of the product to retrieve.
 * @returns {Promise<{data: Array}>} The retrieved product.
 */
async function getBySKU(sku) {
    const row = await db.query(
        `SELECT id, sku, name, in_stock FROM products WHERE sku=?`, 
        [sku]
    );
    const data = helper.emptyOrRows(row);

    return {
        data
    }
}

/**
 * Creates a new product in the database.
 * 
 * @param {string} sku - The SKU of the product.
 * @param {string} name - The name of the product.
 * @param {number} in_stock - The quantity of the product in stock.
 * @returns {Promise<{message: string}>} The result of the create operation.
 */
async function create(sku, name, in_stock) {
    const result = await db.query(
        `INSERT INTO products (sku, name, in_stock) VALUES (?, ?, ?)`, 
        [sku, name, in_stock]
    );

    let message = 'Error in creating product';

    if (result.affectedRows) {
        message = 'Product created successfully';
    }

    return {message};
}

/**
 * Updates an existing product in the database.
 * 
 * @param {number} id - The id of the product to update.
 * @param {string} sku - The new SKU of the product.
 * @param {string} name - The new name of the product.
 * @param {number} in_stock - The new quantity of the product in stock.
 * @returns {Promise<{message: string}>} The result of the update operation.
 */
async function update(id, sku, name, in_stock) {
    const result = await db.query(
        `UPDATE products SET sku=?, name=?, in_stock=? WHERE id=?`, 
        [sku, name, in_stock, id]
    );

    let message = 'Error in updating product';

    if (result.affectedRows) {
        message = 'Product updated successfully';
    }

    return {message};
}

/**
 * Deletes a product from the database.
 * 
 * @param {number} id - The id of the product to delete.
 * @returns {Promise<{message: string}>} The result of the delete operation.
 */
async function remove(id) {
    const result = await db.query(
        `DELETE FROM products WHERE id=?`, 
        [id]
    );

    let message = 'Error in deleting product';

    if (result.affectedRows) {
        message = 'Product deleted successfully';
    }

    return {message};
}

module.exports = {
    getMultiple,
    getOne,
    getBySKU,
    create,
    update,
    remove
}