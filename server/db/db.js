const { Pool, Client } = require('pg');

const pool = new Pool();

pool.query('SELECT NOW()').then(res => {
    console.log('Connected to database');
}).catch(err => console.log(err));

module.exports = pool;