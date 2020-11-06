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
        console.log(address, restaurant, lat, lon);
        const { data } = await axiosZomato.get("/search", {
            params: {
                lat,
                lon,
                q: restaurant,
                radius: 7000,
            },
        });
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = { searchRestaurant };
