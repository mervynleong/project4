const Chat = require("../models/Chat");
const Product = require("../models/Product");
const User = require("../models/User");
const { pgquery } = require("../database/db");

const createChatPG = async (req, res) => {
  try {
    const { text_content } = req.body;
    const from_who = req.params.buyer_username;
    const to_who = req.params.seller_username;
    const item_uuid = req.params.item_uuid;

    // const selectQuery =
    //   "SELECT * FROM personnel JOIN personnel_chat ON (personnel.username = personnel_chat.from_who AND personnel.username = personnel_chat.to_who) JOIN item ON personnel_chat.item_uuid = item.item_uuid WHERE item.uuid = $1 AND personnel_chat.from_who=item.buyer_username AND personnel_chat.to_who=item.seller_username";
    // const { rows } = await pgquery.query(selectQuery, [item_uuid]);
    // // Insert new chat
    const insertQuery =
      "INSERT INTO personnel_chat (text_content, from_who, to_who, item_uuid) VALUES ($1, $2, $3, $4, $5)";
    await pgquery.query(insertQuery, [
      text_content,
      from_who,
      to_who,
      item_uuid,
    ]);
    res.json({ status: "ok", msg: "item listing created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid chat input" });
  }
};

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