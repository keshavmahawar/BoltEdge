const express = require("express");
const {
    registerUser,
    loginUser,
    competitors,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/competitors", competitors);

module.exports = router;
