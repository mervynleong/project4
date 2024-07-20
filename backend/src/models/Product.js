const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    itemName: { type: String, require: true },
    decription: { type: String, require: true },
    condition: {
      type: String,
      require: true,
      enum: ["new", "used", "like new", "mint"],
    },
    category: { type: String, require: true },
    rating: { type: Number },
    listedTime: {type: Date, default: Date.now},
    userIDLink: { type: mongoose.Types.ObjectId, require: true, ref: "User" },
  },
  {
    collection: "product",
  }
);

module.exports = mongoose.model("Product", ProductSchema);
