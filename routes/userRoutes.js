const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", userControllers.signUp);
router.post("/signin", userControllers.signIn);
router.post("/forgot-password", userControllers.forgotPassword);

module.exports = router;
