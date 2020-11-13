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

exports.registerAdmin = async (req, res) => {
    try {
        const { error } = registerValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password, name } = req.body;
        const userExists = await Admin.findOne({ email });

        const encryptedPassword = await bcrypt.hash(
            password,
            await bcrypt.genSalt(10)
        );
        if (userExists) {
            throw new Error("Account already exists");
        }

        const newUser = await new Admin({
            email,
            password: encryptedPassword,
            name,
        });
        await newUser.save();

        res.json({
            message: `${name} registered Successfully`,
            email,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
