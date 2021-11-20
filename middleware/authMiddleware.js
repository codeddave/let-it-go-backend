const User = require("../models/user");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/httpError");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return next(
      new HttpError(
        "You're not authorized to access this route, please log in ",
        401
      )
    );

  try {
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedData.id);
    if (!user) return new HttpError("No user found with that id", 404);
    req.userId = decodedData.id;

    next();
  } catch (error) {
    return next(new HttpError("Not authorized to access this route", 401));
  }
};

module.exports = authMiddleware;
