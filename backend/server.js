const express = require("express");

const axios = require("axios");

const app = express();

app.use(express.json());

async function geocode(address, callback) {
    var config = {
        method: "get",
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
        )}.json?access_token=pk.eyJ1IjoiYWhzYW5oeWRlcjYyNSIsImEiOiJja2gxdzBpNWUwOHprMnpteHBibDRqd2R6In0.rAV_EJwfzgf3wmsOq7Mfyw&limit=1`,
        headers: {},
    };

    axios(config)
        .then(function (response) {
            callback(undefined, {
                latitude: response.data.features[0].center[0],
                longitude: response.data.features[0].center[1],
            });
        })
        .catch(function (error) {
            callback("Unable to connect to location services!", undefined);
        });
}

async function zoma(longitude, latitude, restaurant, callback) {
    var config = {
        method: "get",
        url: `https://developers.zomato.com/api/v2.1/search?q=${restaurant}&${latitude}&${longitude}&radius=7000`,
        headers: {
            Accept: "application/json",
            "user-key": "416837761663a8b9750c348908d23788",
            Cookie:
                "fbcity=11434; zl=en; fbtrack=adbaa00a4212b02706e8c2622b9d342c; AWSALBTG=ehWYgrpc4j2legFlL+bB3FCTsVVu9Q97l5810m1wAdElHKSPelR0fjpJ8Mpl95el6/+EN7uy0WeVSGyzYbFFjMaPVylSKXARP70kyXOf7jc3jbDIUGvQpVRG61iPw8LQjUxGt+dxo8vjV3wkX1ajwiJf2Bl2E1cUNcZBE6pYi7PLAQ55mGg=; AWSALBTGCORS=ehWYgrpc4j2legFlL+bB3FCTsVVu9Q97l5810m1wAdElHKSPelR0fjpJ8Mpl95el6/+EN7uy0WeVSGyzYbFFjMaPVylSKXARP70kyXOf7jc3jbDIUGvQpVRG61iPw8LQjUxGt+dxo8vjV3wkX1ajwiJf2Bl2E1cUNcZBE6pYi7PLAQ55mGg=; csrf=81ed0d3885894d5d0b02cd58dafcfb28",
        },
    };

    axios(config)
        .then(function (response) {
            callback(undefined, response.data);
        })
        .catch(function (error) {
            callback("Unable to find location!", undefined);
        });
}

app.post("/hello", (req, res) => {
    geocode(req.body.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }
        zoma(longitude, latitude, req.body.restaurant, (error, data) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                data,
            });
        });
    });
});

app.listen(5000, () => {
    console.log("The server is up and running!");
});
