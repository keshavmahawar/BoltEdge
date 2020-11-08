import React, { useEffect, userState } from "react";
import { useState } from "react";
import "../index.css";
import axios from "axios";
import { makeStyles, InputBase, Button, Grid, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setRestaurant } from "../redux/User/action";
import Cards from "./CardComponents/Cards";

const useStyles = makeStyles((theme) => ({
    InputBase: {
        border: "1px solid black",
        padding: "0px 5px",
        borderRadius: theme.spacing.borderRadius,
        fontSize: "larger",
        margin: "10px",
    },
    Button: {
        margin: "10px",
    },
    cardContainer: {
        alignItems: "center",
    },
    cardDiv: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
}));

function MapIntegration() {
    const classes = useStyles();
    const gecodeRef = React.useRef();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [gecode, setgeCode] = useState(null);
    const [result, setResult] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const script1 = document.createElement("script");
        script1.src =
            "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");

        script1.onload = () => {
            script2.src =
                "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js";
            script2.async = true;
            document.body.appendChild(script2);
            script2.onload = () => {
                setLoading(false);
                const { mapboxgl, MapboxGeocoder } = window;
                mapboxgl.accessToken =
                    "pk.eyJ1IjoiYWhzYW5oeWRlcjYyNSIsImEiOiJja2gxdzBpNWUwOHprMnpteHBibDRqd2R6In0.rAV_EJwfzgf3wmsOq7Mfyw";
                var map = new mapboxgl.Map({
                    container: "map",
                    style: "mapbox://styles/mapbox/streets-v11",
                    center: [77.1, 28.7],
                    zoom: 7,
                });
                var geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                });
                setgeCode(geocoder);
                gecodeRef.current.appendChild(geocoder.onAdd(map));
            };
        };
    }, []);

    const restaurantsDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/restaurant/search`,
                {
                    restaurant: name,
                    address: gecode._typeahead.data[0].place_name,
                }
            );
            setResult(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const clickHandler = (data) => {
        dispatch(setRestaurant(data)).then(() =>
            history.replace("/dashboard/demo")
        );
    };
    console.log(result);
    return (
        <>
            {loading ? (
                <div>loading Map</div>
            ) : (
                <>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <div
                            id="geocoder"
                            className="geocoder"
                            ref={gecodeRef}
                        ></div>
                        <div>
                            <InputBase
                                type="text"
                                placeholder="Restaruant Name"
                                variant="outlined"
                                className={classes.InputBase}
                                value={name}
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.Button}
                                onClick={restaurantsDetails}
                            >
                                Search
                            </Button>
                        </div>
                    </Box>

                    {result.length == 0 ? (
                        <div id="map" style={{ height: "500px" }}></div>
                    ) : (
                        <Grid container spacing={2} className={classes.grid}>
                            {result.map((item) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    key={item.id}
                                >
                                    <Cards
                                        data={item}
                                        clickHandler={clickHandler}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </>
            )}
        </>
    );
}
export default MapIntegration;
