const mongoose = require("mongoose");
const Auth = require("../models/Auth");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    preferred_location: { type: String },
    interests: { type: String },
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    idLink: { type: mongoose.Types.ObjectId, require: true, ref: "Auth" },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("User", UserSchema);
