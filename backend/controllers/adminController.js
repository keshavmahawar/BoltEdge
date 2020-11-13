const User = require("../models/userModel");

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

module.exports = { userDetails, editIsVerified, viewDetails };
