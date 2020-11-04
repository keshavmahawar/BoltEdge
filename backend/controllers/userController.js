const bcrypt = require("bcrypt");
const axios = require("axios");
const User = require("../models/userModel");
const {
    registerValidator,
    loginValidator,
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
            error: true,
            message: "User registered",
            email,
        });
    } catch (error) {
        res.status(400).json({
            error: true,
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
        const userExists = await User.findOne({ email });

        if (!userExists) {
            throw new Error("Account doesn't exists");
        }

        const passwordCheck = await bcrypt.compare(
            password,
            userExists.password
        );

        if (passwordCheck) {
            res.json({
                auth: email,
                error: false,
                message: "Logged in successfully",
            });
        } else {
            throw new Error("Wrong password");
        }
    } catch (error) {
        res.status(401).json({
            error: true,
            message: error.message,
        });
    }
};

const competitors = (req, res) => {
    axios
        .get(`https://developers.zomato.com/api/v2.1/search?`, {
            params: {
                count: 20,
                lat: 12.937254,
                lon: 77.626938,
                radius: 5000,
                sort: "rating",
                order: "desc",
            },
            headers: {
                "user-key": "37c5a3bc78ac2a208c45a4c912c1f270",
            },
        })
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => res.send(err));
};

module.exports = { registerUser, loginUser, competitors };
