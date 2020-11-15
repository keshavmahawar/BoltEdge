const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const RestaurantSnapshot = require("../models/restaurantSnapshot");
const getRestaurantSnapshot = require("./RestaurantSnapshot");

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
        const list = [18883826];
        // await restaurantList();
        // console.log(list);
        const today = new Date().toLocaleDateString("en-IN");
        let yesterday = new Date(today);

        yesterday.setDate(yesterday.getDate() - 1);
        yesterday = yesterday.toLocaleDateString("en-IN");
        console.log(today, yesterday);

        for (let i = 0; i < list.length; i += 1) {
            const restaurantId = list[i];
            const oldSnapshot = await RestaurantSnapshot.findOne(
                { id: restaurantId },
                { date: 1, votesCount: 1 }
            ).sort({ date: -1 });
            let oldVotes;
            let oldDate;
            console.log(oldSnapshot);
            if (oldSnapshot) {
                let { date } = oldSnapshot;
                date = new Date(date).toLocaleDateString("en-IN");
                if (date === today) {
                    continue;
                }
                oldDate = date;
                oldVotes = oldSnapshot.votesCount;
            }
            console.log(oldDate);
            const snapshot = await getRestaurantSnapshot(restaurantId);
            if (oldDate === yesterday) {
                snapshot.sales = snapshot.votesCount - oldVotes;
            }
            // const newSnapshot = new RestaurantSnapshot(snapshot);
            // newSnapshot.save();
        }
        // console.log(await RestaurantSnapshot.find({ id: 18883826 }));
    } catch (error) {
        console.log(error);
    }
};
// restaurant();
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
