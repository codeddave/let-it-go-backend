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

const createListing = async (req, res, next) => {
  if (!req.userId) return next(new HttpError("User unauthenticated", 400));

  const { title, price, description, images, category } = req.body;

  const listing = new Listing({
    title,
    price,
    description,
    images,
    category,
    createdAt: new Date().toISOString(),
    creator: req.userId,
  });
  try {
    await listing.save();
    return res.status(200).json({ listing });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.getListings = getListings;
exports.createListing = createListing;
