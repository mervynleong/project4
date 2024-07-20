const Chat = require("../models/Chat");
const Product = require("../models/Product");
const User = require("../models/User");

const createChat = async (req, res) => {
  try {
    const chatWUser = await User.findOne({ _id: req.params.id });
    const messageInProduct = await Product.findOne({
      _id: req.body.itemName,
    });
    const newText = {
      textContent: req.body.textContent,
      userIDLink: chatWUser._id,
      productIDLink: messageInProduct,
    };
    await Chat.create(newText);
    res.json({ status: "ok", msg: "Text created" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error creating Text" });
  }
};

module.exports = { createChat };
