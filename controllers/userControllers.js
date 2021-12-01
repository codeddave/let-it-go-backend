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
  } catch (error) {
    return next(new HttpError("Signing up failed, please try again. ", 500));
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new HttpError("please provide email and password", 400));
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return next(new HttpError("user does not exist", 404));

    const passwordsMatch = await existingUser.matchPasswords(password);

    if (!passwordsMatch) return next(new HttpError("Invalid credentials", 400));
    const token = jwt.sign(
      {
        email: existingUser.email,
        name: existingUser.name,
        id: existingUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2hr" }
    );
    console.log(token);

    res.status(200).json({ token });
  } catch (error) {
    return next(new HttpError("Sign In failed, please try again later", 500));
  }
};

exports.signIn = signIn;
exports.signUp = signUp;
