const mongoose = require("mongoose");

const { Schema } = mongoose;

const restaurantSchema = new Schema({
    id: Number,
    name: String,
    cuisines: String,
    url: String,
    lat: Number,
    lon: Number,
});

const User = new Schema({
    name: {
        type: String,
        required: true,
        min: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    gstNo: {
        type: String,
        required: false,
        default: "",
    },
    fssaiNo: {
        type: String,
        required: false,
        default: "",
    },
    phoneNo: {
        type: Number,
        default: 1234567890,
    },
    isVerified: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    restaurant: {
        type: restaurantSchema,
        default: null,
    },
    competitor: {
        type: [restaurantSchema],
        default: Array,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("user", User);
