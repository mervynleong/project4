const Chat = require("../models/Chat");
const Product = require("../models/Product");
const User = require("../models/User");

const createChat = async (req, res) => {
  try {
    const chatWUser = await User.findOne({ _id: req.params.id });
    const messageWProduct = await Product.findOne({
      id: req.body.id,
    });
    const newText = {
      textContent: req.body.textContent,
      username: chatWUser.username,
      userIDLink: chatWUser._id,
      productIDLink: messageWProduct,
    };
    await Chat.create(newText);
    res.json({ status: "ok", msg: "Text created" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error creating Text" });
  }
};

const updateChatByID = async (req, res) => {
  try {
    const chatUpdate = {
      textContent: req.body.textContent,
    };
    await Chat.findByIdAndUpdate(req.params.id, chatUpdate);
    res.json({ status: "ok", msg: "chat updated" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error updating chat" });
  }
};

module.exports = { createChat, updateChatByID };
