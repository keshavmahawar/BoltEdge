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
            user_rating: { votes },
            cuisines,
            average_cost_for_two: average_order_value,
            menu_url,
        } = data;
        const snapshot = {
            timeStamp: Date.now(),
            votes,
            cuisines,
            average_order_value,
        };
        if (menu_url) {
            const {
                totalItems,
                bestSeller,
                discounts,
            } = await orderPageDataSelector(menu_url);
            snapshot["totalItems"] = totalItems;
            snapshot["bestSeller"] = bestSeller;
            snapshot["discounts"] = discounts;
        }
        console.log(snapshot);
        return snapshot;
    } catch (err) {
        console.log(err);
    }
};
getRestaurantSnapShot(18883026);
