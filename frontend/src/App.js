import React from "react";
import MainRouter from "./route/MainRouter";
import "axios-progress-bar/dist/nprogress.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import GetCompetitor from "./components/GetCompetitor";

function App() {
    return (
        <>
            <MainRouter />
            {/* <Alerts /> */}
            <ToastContainer position="bottom-center" />
            {/* <GetCompetitor /> */}
        </>
    );
}

export default App;
