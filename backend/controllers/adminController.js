const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const {
    loginValidator,
    registerValidator,
} = require("../validators/userValidator");

exports.loginAdmin = async (req, res) => {
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
