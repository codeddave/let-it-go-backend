const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: String },
  category: String,
  images: { type: [String], default: [] },
  creator: String,
  createdAt: { type: Date, default: new Date() },
  //  price: {typ: str}
});

module.exports = mongoose.model("Listing", ListingSchema);
