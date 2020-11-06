const { axiosZomato, axiosMapbox } = require("../request/request");

const geoCode = async (address) => {
    const { data } = await axiosMapbox.get(
        `/${encodeURIComponent(address)}.json`
    );

    return {
        lat: data.features[0].center[1],
        lon: data.features[0].center[0],
    };
};

const searchRestaurant = async (req, res) => {
    try {
        const { address, restaurant } = req.body;
        const { lat, lon } = await geoCode(address);
        // console.log(address, restaurant, lat, lon);
        const { data } = await axiosZomato.get("/search", {
            params: {
                lat,
                lon,
                q: restaurant,
                radius: 7000,
            },
        });
        const { restaurants } = data;
        const response = [];
        for (let i = 0; i < restaurants.length; i += 1) {
            // console.log(restaurants[i]);
            const {
                id,
                cuisines,
                url,
                location: { latitude, longitude },
            } = restaurants[i].restaurant;

            response.push({ id, cuisines, url, lat: latitude, lon: longitude });
        }
        res.json(response);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = { searchRestaurant };
