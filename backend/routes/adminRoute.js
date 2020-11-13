const express = require("express");
const {
    userDetails,
    editIsVerified,
    viewDetails,
} = require("../controllers/adminController");

const userAuthCheck = require("../middleware/userAuthCheck");
const userVerifiedAndPaidCheck = require("../middleware/userVerifiedAndPaidCheck");

const router = express.Router();

router.get("/userDetails", userDetails);
router.put("/editIsVerified", editIsVerified);
router.post("/viewDetails", viewDetails);

router.use(userAuthCheck);
router.use(userVerifiedAndPaidCheck);

module.exports = router;
