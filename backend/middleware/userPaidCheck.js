const dotenv = require("dotenv");

dotenv.config();

const userPaidCheck = (req, res, next) => {
    try {
        const { isPaid } = req.user;
        if (isPaid) next();
        else {
            res.status(403).json({
                message: "Access denied you are a Paid User",
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = userPaidCheck;
