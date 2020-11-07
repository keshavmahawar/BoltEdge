import React, { useEffect, userState } from "react";
import { useState } from "react";
function MapIntegration() {
    const gecodeRef = React.useRef();
    const [loading, setLoading] = useState(true);
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
                    center: [-79.4512, 43.6568],
                    zoom: 13,
                });
                var geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                });
                gecodeRef.current.appendChild(geocoder.onAdd(map));
            };
        };
    }, []);
    return (
        <>
            {loading ? (
                <div>loading Map</div>
            ) : (
                <>
                    <div
                        id="geocoder"
                        className="geocoder"
                        ref={gecodeRef}
                    ></div>
                    <div id="map" style={{ height: "500px" }}></div>
                </>
            )}
        </>
    );
}
export default MapIntegration;
