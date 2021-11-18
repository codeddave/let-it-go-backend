const Listing = require("../models/listing");

const HttpError = require("../models/httpError");

const getListings = async (req, res, next) => {
  if (!req.userId) return next(new HttpError("User unauthenticated", 400));

  try {
    const listings = await Listing.find();
    return res.status(200).json({ listings });
  } catch (error) {
    return next(
      new HttpError("Could not load listings, please try again later ", 404)
    );
  }
};

exports.getListings = getListings;
