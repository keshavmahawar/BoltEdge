import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";

let pollingStationRequest = axios.create({
    baseURL: "http://localhost:5000/",
});

loadProgressBar(null, pollingStationRequest);
export default pollingStationRequest;
