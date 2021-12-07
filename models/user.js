const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password "],
  },
  expoPushNotificationtoken: { type: String },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcyrpt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
