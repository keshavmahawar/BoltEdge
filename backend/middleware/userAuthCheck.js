const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        let header = req.get("Authorization");

        if (!header) {
            throw Error("Auth failed");
        }

        header = header.split(" ")[1];

        jwt.verify(header, process.env.JWT_HASH, (err, user) => {
            if (err) res.status(403).json({ message: "Access denied" });
            else {
                req.user = user;
                next();
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = authMiddleware;
