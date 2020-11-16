const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const {
    loginValidator,
} = require("../validators/userValidator");

const loginAdmin = async (req, res) => {
    try {
        const { error } = loginValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            throw new Error("Account doesn't exists");
        }

        const passwordCheck = await bcrypt.compare(password, admin.password);

        if (passwordCheck) {
            const { isVerified, isPaid, email: emailDb } = admin;
            const data = { isVerified, isPaid, email: emailDb };
            const authToken = jwt.sign(data, process.env.JWT_HASH);
            res.json({
                authToken,
                admin,
                message: "Logged in successfully",
            });
        } else {
            throw new Error("Wrong password");
        }
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

const viewDetails = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("No data found");
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

const editIsVerified = async (req, res) => {
    const { id, isVerified } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("Error while updating");
        } else {
            user.isVerified = isVerified;
            user.save();
            res.json({
                message: "User verifed status updated successfully",
            });
        }
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

const userDetails = async (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.totalCount = await User.countDocuments().exec()

    if (endIndex < (await User.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: Number(limit),
        };
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: Number(limit),
        };
    }
    try {
        results.current = await User.find().limit(limit).skip(startIndex).exec();
        res.json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const searchByName = async (req, res) => {
    const { userName } = req.query;
    try {
        const user = await User.find({ name: userName });
        if (!user) {
            throw new Error("User not found");
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

const filterByIsverified = async (req, res) => {
    const { userIsVerifed } = req.query;
    try {
        const user = await User.find({ isVerified: { $eq: userIsVerifed } });
        if (!user) {
            throw new Error("User not found");
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

module.exports = {
    userDetails, editIsVerified, viewDetails, searchByName,
    filterByIsverified, loginAdmin
};
