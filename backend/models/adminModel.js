const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

Admin.methods.generateAuthToken = async function () {
    const admin = this;
    const token = jwt.sign({ _id: admin._id.toString() }, "thisismynewtoken");

    admin.tokens = admin.tokens.concat({ token });
    await admin.save();

    return token;
};

Admin.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }
    return admin;
};

Admin.pre("save", async function (next) {
    const admin = this;

    if (admin.isModified("password")) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }

    next();
});

Admin.methods.toJSON = function () {
    const admin = this;
    const adminObject = admin.toObject();

    delete adminObject.password;
    delete adminObject.tokens;

    return adminObject;
};

module.exports = mongoose.model("admin", Admin);
