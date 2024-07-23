require("dotenv").config();
const { Pool } = require("pg");

const pgquery = new Pool({
  user: "db_user",
  password: process.env.PASSWORD,
  host: "localhost",
  port: 5432,
  database: "project4",
});

module.exports = { pgquery };
