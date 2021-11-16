const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  name: { type: String, required: true },

  description: { type: String },
  category: String,
  //  price: {typ: str}
});

module.exports = mongoose.model("Listing", ListingSchema);
