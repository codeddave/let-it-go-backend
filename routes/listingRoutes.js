const express = require("express");
const listingControllers = require("../controllers/listingControllers");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.get("/", listingControllers.getListings);
router.post("/", upload.single("images"), listingControllers.createListing);

module.exports = router;
