const express = require("express");
const {
    registerUser,
    loginUser,
    setRestaurant,
    competitors,
} = require("../controllers/userController");

const userAuthCheck = require("../middleware/userAuthCheck");
const userVerifiedAndPaidCheck = require("../middleware/userVerifiedAndPaidCheck");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(userAuthCheck);
router.use(userVerifiedAndPaidCheck);

router.get("/competitors", competitors);
router.post("/restaurant", setRestaurant);

module.exports = router;
