const { pgquery } = require("../database/db");

const getTypes = async (req, res) => {
  try {
    const getAllQuery = "SELECT * FROM types";
    const result = await pgquery.query(getAllQuery);
    const data = result.rows;
    const x = data.map((i) => i.type);
    console.log(x);
    res.json({ x });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "cannot get types" });
  }
};

const seedTypes = async (req, res) => {
  try {
    const deleteAllQuery = "DELETE FROM types";
    await pgquery.query(deleteAllQuery);
    const insertQuery = "INSERT INTO types (type) VALUES ($1, $2, $3)";
    await pgquery.query(insertQuery, "ADMIN", "SELLER", "BUYER");

    res.json({ status: "ok", msg: "seeded type data" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "cannot seed types" });
  }
};

module.exports = { getTypes, seedTypes };
