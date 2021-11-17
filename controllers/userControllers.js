const User = require("../models/user");
const HttpError = require("../models/httpError");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new HttpError("user exists!", 400));

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    return res.status(200).json({ token });
  } catch (error) {}
};

const signIn = async (req, res, next) => {};

exports.signIn = signIn;
exports.signUp = signUp;
