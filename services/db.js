const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    console.log('sql', sql);
    console.log('params', params);
    const [results,] = await connection.query(sql, params)

    return results;
}

module.exports = {
    query
}