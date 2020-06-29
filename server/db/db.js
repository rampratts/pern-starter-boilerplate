const { Pool, Client } = require('pg');

const pool = new Pool();

pool.query('SELECT NOW()', (err, res) => {
    if(err) {
        console.log('Error while connecting to database: ',err);
    } else {
        console.log('Connection to database established');
    }
    pool.end()
})

module.exports = pool;