const User = require("../models/User");
const Product = require("../models/Product");
const { pgquery } = require("../database/db");

// const createProduct = async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     const newProduct = {
//       itemName: req.body.itemName,
//       description: req.body.description,
//       condition: req.body.condition,
//       category: req.body.category,
//       username: user.username,
//       userIDLink: user._id,
//     };
//     const newProductModel = new Product(newProduct);
//     await newProductModel.save();
//     res.json({ status: "ok", msg: "listing created" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error creating listing" });
//   }
// };

// const updateProductByID = async (req, res) => {
//   try {
//     const updateProduct = {
//       itemName: req.body.itemName,
//       description: req.body.description,
//       condition: req.body.contion,
//       category: req.body.category,
//     };
//     await Product.findByIdAndUpdate(req.params.id, updateProduct);
//     res.json({ status: "ok", msg: "product updated" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error updating product" });
//   }
// };

// const deleteProductByID = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ status: "ok", msg: "Product deleted" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error deleting Product" });
//   }
// };

// const getAllProducts = async (req, res) => {
//   try {
//     const allProducts = await Product.find().populate("userIDLink", "username");
//     res.json(allProducts);
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: error, msg: "error getting products" });
//   }
// };

const createProductPG = async (req, res) => {
  try {
    const { description, sell_price, item_name, status } = req.body;
    const seller_username = req.params.params;
    // Check if username already exists
    const checkQuery = "SELECT * FROM personnel WHERE username = $1";
    const { rows } = await pgquery.query(checkQuery, [seller_username]);
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
      seller_username,
    ]);
    res.json({ status: "ok", msg: "item listing created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid creation" });
  }
};

const deleteItemPG = async (req, res) => {
  try {
    const item_uuid = req.params.params;
    // Check if item exists
    const checkQuery = "SELECT * FROM item WHERE item_uuid = $1";
    const { rows } = await pgquery.query(checkQuery, [item_uuid]);
    if (rows[0].item_uuid === item_uuid) {
      const deleteQuery = "DELETE FROM item WHERE item_uuid = $1";
      await pgquery.query(deleteQuery, [item_uuid]);
    }
    res.json({ status: "ok", msg: "item listing deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid deletion" });
  }
};

const updateItemPG = async (req, res) => {
  try {
    const { description, sell_price, item_name, status } = req.body;
    const item_uuid = req.params.params;
    // Check if item exists
    const checkQuery = "SELECT * FROM item WHERE item_uuid = $1";
    const { rows } = await pgquery.query(checkQuery, [item_uuid]);

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
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid update" });
  }
};

const buyItemPG = async (req, res) => {
  try {
    const { buy_price, buyer_username } = req.body;
    const item_uuid = req.params.params;
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
        buyer_username,
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
    const item_uuid = req.params.params;
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

// module.exports = {
//   createProduct,
//   updateProductByID,
//   deleteProductByID,
//   getAllProducts,
// };
module.exports = {
  createProductPG,
  buyItemPG,
  deleteItemPG,
  updateItemPG,
  getItemByIDPG,
};
