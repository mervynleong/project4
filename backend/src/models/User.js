const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    preferredLocation: { type: String },
    interests: { type: String },
    rating: { type: Number },
    idLink: { type: mongoose.Types.ObjectId, require: true, ref: "Auth" },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("User", UserSchema);
