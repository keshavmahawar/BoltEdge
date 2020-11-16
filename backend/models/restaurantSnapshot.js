const mongoose = require("mongoose");

const { Schema } = mongoose;

const RestaurantSnapshot = new Schema({
    date: Date,
    id: Number,
    timestamp: Number,
    votesCount: Number,
    rating: Number,
    reviewCount: Number,
    cuisines: String,
    averageOrderValue: Number,
    hasOnlineOrder: Number,
    totalItems: Number,
    bestSeller: Array,
    discounts: Array,
    newUserDiscount: Array,
    sales: {
        type: Number,
        default: null,
    },
});

module.exports = mongoose.model("restaurantSnapshot", RestaurantSnapshot);
