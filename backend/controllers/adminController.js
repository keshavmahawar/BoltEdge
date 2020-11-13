const User = require("../models/userModel");

const userDetails = async (req, res) => {
    try {
        const user = await User.find();
        res.json({
            user,
            message: "user details",
        });
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
    const { id, isVerifed } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("Error while updating");
        } else {
            user.isVerifed = isVerifed;
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

const pagination = async (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
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
        results.curr = await User.find().limit(limit).skip(startIndex).exec();
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { userDetails, editIsVerified, pagination, viewDetails };
