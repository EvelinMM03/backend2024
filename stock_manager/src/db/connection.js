const mariadb = require('mariadb');

const config = {
    host: '127.0.0.1' ,
    user: 'mariadb_user' ,
    password: 'abc123' ,
    database: 'stockdb' ,
    port: 3306,
    connectionLimit: 10
};

const pool = mariadb.createPool(config);
