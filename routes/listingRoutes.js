const express = require("express");
const listingControllers = require("../controllers/listingControllers");
const router = express.Router();

router.get("/", listingControllers.getListings);
router.post("/", listingControllers.createListing);

module.exports = router;
