const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Abcdefgh1",
  host: "localhost",
  port: 5432,
  database: "students"
});

module.exports = pool;