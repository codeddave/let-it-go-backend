const User = require("../models/user");
const HttpError = require("../models/httpError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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
      { expiresIn: "100hr" }
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
      { expiresIn: "20hr" }
    );
    console.log(token);

    res.status(200).json({ token });
  } catch (error) {
    return next(new HttpError("Sign In failed, please try again later", 500));
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(new HttpError("Email could not be sent ", 404));

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    await user.save();
    const resetUrl = `https://let-it-go.netlify.app/reset-password/${resetToken}`;

    const message = `
    <h1> You have requested a password reset</h1>
    <p>Please click on this link to reset your password</p>
    <a href=${resetUrl} clicktracking= off>${resetUrl}</a> `;
  } catch (error) {}
};

exports.signIn = signIn;
exports.signUp = signUp;
exports.forgotPassword = forgotPassword;
