const User = require("../models/User");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const newProduct = {
      itemName: req.body.itemName,
      description: req.body.description,
      condition: req.body.condition,
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

const updateProductByID = async (req, res) => {
  try {
    const updateProduct = {
      itemName: req.body.itemName,
      description: req.body.description,
      condition: req.body.contion,
      category: req.body.category,
    };
    await Product.findByIdAndUpdate(req.params.id, updateProduct);
    res.json({ status: "ok", msg: "product updated" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error updating product" });
  }
};

const deleteProductByID = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "Product deleted" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error deleting Product" });
  }
};

module.exports = { createProduct, updateProductByID, deleteProductByID };
