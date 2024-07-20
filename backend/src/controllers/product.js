const User = require("../models/User");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const newProduct = {
      itemName: req.body.itemName,
      description: req.body.description,
      condition: req.body.contion,
      category: req.body.category,
      username: user.username,
      userIDLink: user._id,
    };
    const newProductModel = new Product(newProduct);
    await newProductModel.save();
    res.json({ status: "ok", msg: "listing created" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error creating listing" });
  }
};

module.exports = { createProduct };
