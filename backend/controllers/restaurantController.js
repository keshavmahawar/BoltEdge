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

const restaurantDataParser = (data) => {
    const { restaurants } = data;
    const response = [];
    for (let i = 0; i < restaurants.length; i += 1) {
        const {
            id,
            name,
            cuisines,
            url,
            location: { latitude, longitude, address },
        } = restaurants[i].restaurant;

        response.push({
            name,
            id,
            cuisines,
            url,
            address,
            lat: latitude,
            lon: longitude,
        });
    }
    return response;
};

const searchRestaurant = async (req, res) => {
    try {
        const { address, restaurant } = req.body;
        const { lat, lon } = await geoCode(address);

        const { data } = await axiosZomato.get("/search", {
            params: {
                lat,
                lon,
                q: restaurant,
                radius: 7000,
            },
        });

        res.json(restaurantDataParser(data));
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = { searchRestaurant, restaurantDataParser };
