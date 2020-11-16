const mongoose = require("mongoose");

const { Schema } = mongoose;

const Transaction = new Schema({
    orderId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    type: { type: Number, required: true },
    status: {
        type: Boolean,
        default: false,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("transaction", Transaction);
