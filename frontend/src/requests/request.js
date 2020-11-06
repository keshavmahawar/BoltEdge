import axios from "axios";

let pollingStationRequest = axios.create({
    baseURL: "http://localhost:5000/",
});

export default pollingStationRequest;
