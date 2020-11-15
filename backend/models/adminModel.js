const mongoose = require("mongoose");

const { Schema } = mongoose;

const Admin = new Schema({
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
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    isVerified: { type: Boolean, default: false },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("admin", Admin);