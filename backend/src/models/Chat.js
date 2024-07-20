const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    textContent: { type: String, require: true },
    username: { type: String, require: true },
    userIDLink: { type: mongoose.Types.ObjectId, require: true, ref: "user" },
    productIDLink: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "product",
    },
    timestamp: { type: Date, default: Date.now },
  },
  {
    collection: "chat",
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
