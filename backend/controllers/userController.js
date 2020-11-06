const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const {
    registerValidator,
    loginValidator,
    restaurantValidator,
} = require("../validators/userValidator");

const registerUser = async (req, res) => {
    try {
        const { error } = registerValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password, name } = req.body;
        const userExists = await User.findOne({ email });

        const encryptedPassword = await bcrypt.hash(
            password,
            await bcrypt.genSalt(10)
        );
        if (userExists) {
            throw new Error("Account already exists");
        }

        const newUser = await new User({
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

const loginUser = async (req, res) => {
    try {
        const { error } = loginValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (passwordCheck) {
            const { isVerified, isPaid, email: emailDb } = user;
            const data = { isVerified, isPaid, email: emailDb };
            const authToken = jwt.sign(data, process.env.JWT_HASH);
            res.json({
                authToken,
                user,
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

const setRestaurant = async (req, res) => {
    try {
        const { error } = restaurantValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { id, cuisines, url, lat, lon } = req.body;

        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        }

        user.restaurant = { id, cuisines, url, lat, lon };

        user.save();

        res.json({
            message: "restaurant updated",
            restaurant: user.restaurant,
        });
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

module.exports = { registerUser, loginUser, setRestaurant };
