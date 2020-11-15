const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
const request = require("request");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Transaction = require("../models/transactionsModel");
const Report = require("./reportsClass");
const {
    restaurantSnapshotsSave,
} = require("../webscraper/restaurantDataScripts");

dotenv.config();
const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

const { axiosZomato } = require("../request/request");
const {
    registerValidator,
    loginValidator,
    restaurantValidator,
    restaurantArrayValidator,
    passwordValidator,
    phoneNoValidator,
    bussinessDetailsValidator,
} = require("../validators/userValidator");
const { restaurantDataParser } = require("./restaurantController");

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
            const {
                isVerified,
                email: emailDb,
                restaurant,
                isPaidTill,
                _id,
                name,
                phoneNo,
                gstNo,
                fssaiNo,
                competitor,
            } = user;
            const isPaid = Date.now() < isPaidTill;
            const data = { isVerified, isPaid, email: emailDb };
            const authToken = jwt.sign(data, process.env.JWT_HASH);
            res.json({
                authToken,
                user: {
                    isVerified,
                    email: emailDb,
                    restaurant,
                    isPaidTill,
                    _id,
                    isPaid,
                    name,
                    phoneNo,
                    gstNo,
                    fssaiNo,
                    competitor,
                },
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

const refreshUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        }

        const {
            isVerified,
            email: emailDb,
            restaurant,
            isPaidTill,
            _id,
            name,
            phoneNo,
            gstNo,
            fssaiNo,
            competitor,
        } = user;
        const isPaid = Date.now() < isPaidTill;
        const data = { isVerified, isPaid, email: emailDb };
        const authToken = jwt.sign(data, process.env.JWT_HASH);
        res.json({
            authToken,
            user: {
                isVerified,
                email: emailDb,
                restaurant,
                isPaidTill,
                _id,
                isPaid,
                name,
                phoneNo,
                gstNo,
                fssaiNo,
                competitor,
            },
        });
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

        const { id, cuisines, url, lat, lon, name, address } = req.body;

        const { email } = req.user;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Account doesn't exists");
        }
        user.restaurant = { id, cuisines, url, lat, lon, name, address };
        user.competitor = [];
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

const setUserCompetitors = async (req, res) => {
    try {
        const { error } = restaurantArrayValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        }
        user.competitor = req.body;
        user.save();

        res.json({
            message: "restaurant competitors updated",
            competitor: user.competitor,
        });
        let competitorIdList = user.competitor.map(
            (restaurant) => restaurant.id
        );
        competitorIdList = [...competitorIdList, user.restaurant.id];
        restaurantSnapshotsSave(competitorIdList);
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

const competitors = async (req, res) => {
    try {
        const { email } = req.user;
        const { restaurant } = await User.findOne({ email });
        if (restaurant === null) throw Error("Restaurant doesn't exist");

        const { lat, lon, cuisines } = restaurant;
        const cuisinesArray = cuisines.split(", ");
        const {
            data: { cuisines: cuisinesData },
        } = await axiosZomato.get("/cuisines", {
            params: {
                lat,
                lon,
            },
        });
        const cuisinesArrayKey = [];
        for (let i = 0; i < cuisinesArray.length; i += 1) {
            for (let j = 0; j < cuisinesData.length; j += 1) {
                const cuisine = cuisinesData[j].cuisine;
                if (cuisinesArray[i] === cuisine.cuisine_name)
                    cuisinesArrayKey.push(cuisine.cuisine_id);
            }
        }

        const { data } = await axiosZomato.get("/search", {
            params: {
                count: 20,
                lat,
                lon,
                radius: 5000,
                sort: "rating",
                order: "desc",
                cuisines: cuisinesArrayKey.join(","),
            },
        });

        res.json(restaurantDataParser(data));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { error } = passwordValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { oldPassword, newPassword } = req.body;
        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        }

        const passwordCheck = await bcrypt.compare(oldPassword, user.password);
        if (passwordCheck) {
            const encryptedPassword = await bcrypt.hash(
                newPassword,
                await bcrypt.genSalt(10)
            );
            user.password = encryptedPassword;
            await user.save();
            res.json({
                message: "Password Updated Successfully",
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

const updatePhoneNo = async (req, res) => {
    try {
        const { error } = phoneNoValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { phoneNo } = req.body;
        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        } else {
            user.phoneNo = phoneNo;
            user.save();
            res.json({
                message: "Phone Number Updated Successfully",
                phoneNo,
            });
        }
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

const updateBussinessDetails = async (req, res) => {
    try {
        const { error } = bussinessDetailsValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { gstNo, fssaiNo } = req.body;
        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        } else {
            user.gstNo = gstNo;
            user.fssaiNo = fssaiNo;
            user.save();
            res.json({
                message: "Bussiness Detais Updated Successfully",
                details: {
                    gstNo,
                    fssaiNo,
                },
            });
        }
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

const placeOrders = async (req, res) => {
    try {
        let { type } = req.body;
        const { email } = req.user;
        let amount = 0;
        type = Number(type);

        if (type === 1) {
            amount = 200;
        } else if (type === 2) {
            amount = 2000;
        } else {
            throw Error("Invalid Type");
        }
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: uuidv4(),
            payment_capture: 0,
        };
        instance.orders.create(options, async (err, order) => {
            if (err) {
                throw new Error("Something went wrong");
            }
            console.log(order);
            const transaction = new Transaction({
                type,
                amount,
                userEmail: email,
                orderId: order.id,
            });
            await transaction.save();
            return res.status(200).json(order);
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong Again!",
        });
    }
};

const captureOrders = async (req, res) => {
    try {
        const {
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
        } = req.body;
        const transaction = await Transaction.findOne({ orderId });
        if (!transaction) {
            throw Error("Transaction not found");
        }
        const { amount, userEmail, type } = transaction;
        return request(
            {
                method: "POST",
                url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${paymentId}/capture`,

                form: {
                    amount: amount * 100,
                    currency: "INR",
                },
            },
            async function (err, body) {
                if (err) {
                    return res.status(500).json({
                        message: "Something Went Wrong!",
                    });
                }
                const response = JSON.parse(body.body);
                if (response.status === "captured") {
                    const user = await User.findOne({ email: userEmail });
                    let paidTill = user.isPaidTill;
                    const currentDate = Date.now();
                    paidTill = Math.max(paidTill, currentDate);
                    if (type === 1) {
                        paidTill += 2592000000;
                    } else {
                        paidTill += 31104000000;
                    }
                    user.isPaidTill = paidTill;
                    transaction.status = true;
                    await user.save();
                    await transaction.save();
                    res.status(200).json({ message: "Payment successful" });
                } else {
                    throw Error("payment failed");
                }
            }
        );
    } catch (err) {
        return res.status(500).json({
            message: "Something Went wrong Again!",
        });
    }
};

const userReport = async (req, res) => {
    try {
        const { competitorNo } = req.query;
        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Account doesn't exists");
        }
        const brandId = user.restaurant.id;
        const competitorId = user.competitor[competitorNo].id;
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 7);
        const report = new Report(brandId, competitorId, start, end);
        await report.getSnapshots();
        // console.log(report);
        if (!report.dataAvailable()) {
            res.json({ dataAvailable: false });
            return;
        }
        const data = {
            dataAvailable: true,
            rating: report.getRating(),
            bestSellers: report.getBestSeller(),
            votes: report.getVotes(),
            noOfItems: report.getNoOfItems(),
            cuisines: report.getCuisinesType(),
            aov: report.getAverageOrderValue(),
            discount: report.getDiscount(),
            discountGap: report.getDiscountGap(),
            noOfDaysData: report.getNoOfDaysData(),
            burn: report.getCompetitorAverageBurn(),
            isCompetitorOnline: report.getIsCompetitorOnline(),
        };
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    competitors,
    setRestaurant,
    setUserCompetitors,
    updatePassword,
    updatePhoneNo,
    updateBussinessDetails,
    placeOrders,
    captureOrders,
    refreshUser,
    userReport,
};
