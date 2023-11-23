const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.HOST_BBDD,
    port: process.env.PORT_BBDD,
    user: process.env.USER_BBDD,
    password: process.env.PASSWORD_BBDD,
    database: process.env.DATABASE_NAME
});

module.exports = pool;