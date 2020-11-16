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
    placeOrders,
    refreshUser,
    captureOrders,
    userReport,
    createMockData,
    demoReport,
} = require("../controllers/userController");

const userAuthCheck = require("../middleware/userAuthCheck");
const userPaidCheck = require("../middleware/userPaidCheck");
const userVerifiedAndPaidCheck = require("../middleware/userVerifiedAndPaidCheck");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/mock", createMockData);
router.get("/demo", demoReport);

router.use(userAuthCheck);
router.post("/updatePhoneNo", updatePhoneNo);
router.post("/order", placeOrders);
router.post("/paid", captureOrders);
router.get("/refresh", refreshUser);
router.put("/updatePassword", updatePassword);
router.post("/updateBusinessDetails", updateBussinessDetails);

router.use(userPaidCheck);
router.post("/restaurant", setRestaurant);

router.use(userVerifiedAndPaidCheck);
router.get("/competitors", competitors);
router.get("/report", userReport);
router.post("/competitors", setUserCompetitors);

module.exports = router;
