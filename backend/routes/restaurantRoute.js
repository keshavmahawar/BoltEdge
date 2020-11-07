const express = require("express");
const { searchRestaurant } = require("../controllers/restaurantController");

const router = express.Router();

router.post("/search", searchRestaurant);

module.exports = router;
