const axios = require("axios");
const { orderPageDataSelector } = require("./webScraper");

const getRestaurantSnapShot = async (id) => {
    try {
        const { data } = await axios.get(
            "https://developers.zomato.com/api/v2.1/restaurant",
            {
                params: {
                    res_id: id,
                },
                headers: {
                    "user-key": "e843930fc34eeb371f6e99c2c82b6102",
                },
            }
        );

        const {
            user_rating: { votes: votesCount, aggregate_rating: rating },
            cuisines,
            has_online_delivery: hasOnlineOrder,
            average_cost_for_two: averageOrderValue,
            all_reviews_count: reviewCount,
            url,
        } = data;
        const snapshot = {
            date: new Date().toLocaleDateString("en-IN"),
            timeStamp: Date.now(),
            votesCount,
            rating,
            reviewCount,
            cuisines,
            averageOrderValue,
            hasOnlineOrder,
        };
        if (hasOnlineOrder) {
            const orderUrl = `${url.split("?")[0]}/order`;
            const {
                totalItems,
                bestSeller,
                discounts,
                newUserDiscount,
            } = await orderPageDataSelector(orderUrl);
            snapshot.totalItems = totalItems;
            snapshot.bestSeller = bestSeller;
            snapshot.discounts = discounts;
            snapshot.newUserDiscount = newUserDiscount;
        }
        console.log(snapshot);
        return snapshot;
    } catch (err) {
        console.log(err);
        return err;
    }
};
getRestaurantSnapShot(18883026);
