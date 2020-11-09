const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config({ path: "../.env" });

const restaurantList = async () => {
    try {
        const data = await User.aggregate([
            {
                $group: {
                    _id: 0,
                    data: { $push: "$competitor.id" },
                    restaurant: { $push: "$restaurant.id" },
                },
            },
            {
                $project: {
                    data: {
                        $reduce: {
                            input: "$data",
                            initialValue: [],
                            in: { $setUnion: ["$$value", "$$this"] },
                        },
                    },
                    restaurant: 1,
                },
            },
            {
                $project: {
                    restaurantsList: {
                        $setUnion: ["$data", "$restaurant"],
                    },
                },
            },
        ]);
        return data[0].restaurantsList;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const restaurant = async () => {
    try {
        const list = await restaurantList();
        for (let i = 0; i < list.length; i += 1) {
            const restaurantId = list[i];
            console.log(restaurantId);
        }
    } catch (error) {
        console.log(error);
    }
};
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (error) => {
        if (error) console.log(`error connecting database : ${error}`);
        else {
            console.log("Database connected");
            restaurant();
        }
    }
);
