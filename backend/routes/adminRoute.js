const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/login", adminController.getAdmin);

router.post("/signUp", adminController.addAdmin);

module.exports = router;
