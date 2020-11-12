const express = require("express");
const {
    registerUser,
    loginUser,
    setRestaurant,
    competitors,
    setUserCompetitors,
    updatePassword,
    updatePhoneNo,
    updateBussinessDetails,
} = require("../controllers/userController");

const userAuthCheck = require("../middleware/userAuthCheck");
const userVerifiedAndPaidCheck = require("../middleware/userVerifiedAndPaidCheck");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(userAuthCheck);
router.post("/updatePhoneNo", updatePhoneNo);
router.put("/updatePassword", updatePassword);
router.post("/updateBusinessDetails", updateBussinessDetails);

router.use(userVerifiedAndPaidCheck);

router.get("/competitors", competitors);
router.post("/competitors", setUserCompetitors);
router.post("/restaurant", setRestaurant);

module.exports = router;
