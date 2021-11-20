const express = require("express");
const listingControllers = require("../controllers/listingControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.get("/", authMiddleware, listingControllers.getListings);
router.post(
  "/",
  [authMiddleware, upload.single("images")],
  listingControllers.createListing
);

module.exports = router;
