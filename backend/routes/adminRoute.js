const express = require("express");
const {
    userDetails,
    editIsVerified,
    viewDetails,
    searchByName,
    filterByIsverified,
    loginAdmin
} = require("../controllers/adminController");

const userAuthCheck = require("../middleware/userAuthCheck");
const userVerifiedAndPaidCheck = require("../middleware/userVerifiedAndPaidCheck");

const router = express.Router();

router.get("/userDetails", userDetails);
router.put("/editIsVerified", editIsVerified);
router.post("/viewDetails", viewDetails);
router.get("/searchByName", searchByName);
router.get("/filterByIsverified", filterByIsverified);
router.post("/login", loginAdmin);

router.use(userAuthCheck);
router.use(userVerifiedAndPaidCheck);

module.exports = router;
