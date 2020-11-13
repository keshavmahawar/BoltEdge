const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/login", adminController.loginAdmin);
router.post("/signUp", adminController.registerAdmin);

module.exports = router;
