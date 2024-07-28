const { pgquery } = require("../database/db");

const createProductPG = async (req, res) => {
  try {
    const { description, sell_price, item_name, status } = req.body;
    // Check if username already exists
    const checkQuery = "SELECT * FROM personnel WHERE username = $1";
    const { rows } = await pgquery.query(checkQuery, [req.decoded.username]);
    console.log(rows);
    // row length must exact to 1
    if (rows.length !== 1) {
      return res
        .status(400)
        .json({ status: "error", msg: "duplicate username in database" });
    }
    // Insert new product
    const insertQuery =
      "INSERT INTO item (description, sell_price, item_name, status, seller_username) VALUES ($1, $2, $3, $4, $5)";
    await pgquery.query(insertQuery, [
      description,
      sell_price,
      item_name,
      status,
      req.decoded.username,
    ]);
    res.json({ status: "ok", msg: "item listing created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid creation" });
  }
};

const deleteItemPG = async (req, res) => {
  try {
    const approvedUser = req.decoded.username;
    const item_uuid = req.params.item_uuid;
    // Check if item exists
    const checkQuery = "SELECT * FROM item WHERE item_uuid = $1";
    const { rows } = await pgquery.query(checkQuery, [item_uuid]);
    const userQuery = "SELECT seller_username FROM item WHERE item_uuid=$1";
    const ans = await pgquery.query(userQuery, [item_uuid]);
    if (
      ans.rows[0].seller_username === approvedUser ||
      req.decode.type === "ADMIN"
    ) {
      if (rows[0].item_uuid === item_uuid) {
        const deleteQuery = "DELETE FROM item WHERE item_uuid = $1";
        await pgquery.query(deleteQuery, [item_uuid]);
      }
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "Not original lister" });
    }

    res.json({ status: "ok", msg: "item listing deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid deletion" });
  }
};

const updateItemPG = async (req, res) => {
  try {
    const approvedUser = req.decoded.username;
    const { description, sell_price, item_name, status } = req.body;
    const item_uuid = req.params.item_uuid;
    // Check if item exists
    const checkQuery = "SELECT * FROM item WHERE item_uuid = $1";
    const { rows } = await pgquery.query(checkQuery, [item_uuid]);

    const userQuery = "SELECT seller_username FROM item WHERE item_uuid=$1";
    const ans = await pgquery.query(userQuery, [item_uuid]);
    // checking if approved user

    if (ans.rows[0].seller_username === approvedUser) {
      if (rows[0].item_uuid === item_uuid) {
        // Insert new product
        const updateQuery =
          "UPDATE item SET description = $2, sell_price = $3, item_name = $4, status = $5 WHERE item_uuid = $1";
        await pgquery.query(updateQuery, [
          item_uuid,
          description,
          sell_price,
          item_name,
          status,
        ]);
      }
      res.json({ status: "ok", msg: "listing updated" });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "Not original lister" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid update" });
  }
};

const buyItemPG = async (req, res) => {
  try {
    const { buy_price } = req.body;
    const item_uuid = req.params.item_uuid;
    // Check if item exists
    const checkQuery = "SELECT * FROM item WHERE item_uuid = $1";
    const { rows } = await pgquery.query(checkQuery, [item_uuid]);
    console.log(rows);
    console.log(rows[0].status);

    if (rows[0].status === "AVAILABLE") {
      // Insert new product
      const updateQuery =
        "UPDATE item SET buy_price = $1, status = $2, buyer_username = $3 WHERE item_uuid = $4";
      await pgquery.query(updateQuery, [
        buy_price,
        "SOLD",
        req.decoded.username,
        item_uuid,
      ]);
    }
    res.json({ status: "ok", msg: "item bought" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid update" });
  }
};

const getItemByIDPG = async (req, res) => {
  try {
    const item_uuid = req.params.item_uuid;
    const getQuery = "SELECT * FROM item WHERE item_uuid = $1";
    const result = await pgquery.query(getQuery, [item_uuid]);
    const data = result.rows[0];
    console.log(data);
    res.json({ data });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid request" });
  }
};

const getAllItemPG = async (req, res) => {
  try {
    const getAllQuery = "SELECT * FROM item";
    const result = await pgquery.query(getAllQuery);
    const data = result.rows;
    res.json({ data });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid request" });
  }
};

module.exports = {
  createProductPG,
  buyItemPG,
  deleteItemPG,
  updateItemPG,
  getItemByIDPG,
  getAllItemPG,
};
