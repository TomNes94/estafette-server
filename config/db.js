const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DATABASE,
  password: process.env.DBPASS,
  port: 5432,
});

module.exports = pool;

