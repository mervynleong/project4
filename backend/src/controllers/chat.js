const Chat = require("../models/Chat");
const Product = require("../models/Product");
const User = require("../models/User");
const { pgquery } = require("../database/db");

const createChatPG = async (req, res) => {
  
}

// const createChat = async (req, res) => {
//   try {
//     const chatWUser = await User.findOne({ _id: req.params.id });
//     const messageWProduct = await Product.findOne({
//       id: req.body.id,
//     });
//     const newText = {
//       textContent: req.body.textContent,
//       username: chatWUser.username,
//       userIDLink: chatWUser._id,
//       productIDLink: messageWProduct,
//     };
//     await Chat.create(newText);
//     res.json({ status: "ok", msg: "Text created" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error creating Text" });
//   }
// };

// const updateChatByID = async (req, res) => {
//   try {
//     const chatUpdate = {
//       textContent: req.body.textContent,
//     };
//     await Chat.findByIdAndUpdate(req.params.id, chatUpdate);
//     res.json({ status: "ok", msg: "chat updated" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error updating chat" });
//   }
// };

// const getAllChatInProduct = async (req, res) => {
//   try {
//     const allChat = await Chat.find().populate("productIDLink");
//     res.json(allChat);
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error fetching chat Content" });
//   }
// };

// module.exports = { createChat, updateChatByID, getAllChatInProduct };
