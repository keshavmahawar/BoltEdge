const axios = require("axios");

const axiosZomato = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1/",
    headers: {
        "user-key": "416837761663a8b9750c348908d23788",
    },
});

const axiosMapbox = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    params: {
        access_token:
            "pk.eyJ1Ijoia2VzbWFoYXdhciIsImEiOiJja2g1eWt3eW8wM3I0MnNsMmZpaHc1bzFsIn0.OGyfp5nFETDhmCjUB_moLw",
        limit: 1,
    },
});

module.exports = { axiosMapbox, axiosZomato };
