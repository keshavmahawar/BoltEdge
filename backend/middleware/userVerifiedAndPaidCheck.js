const dotenv = require("dotenv");

dotenv.config();

const userVerifiedAndPaidCheck = (req, res, next) => {
    try {
        const { isPaid, isVerified } = req.user;
        if (isPaid && isVerified) next();
        else {
            res.status(403).json({
                message: "Access denied you are not paid or not verified",
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = userVerifiedAndPaidCheck;
