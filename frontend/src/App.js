import React from "react";
import MainRouter from "./route/MainRouter";
import "axios-progress-bar/dist/nprogress.css";
import Register from "./pages/Register";

function App() {
    return (
        <>
            {/* <Register /> */}
            <MainRouter />
            {/* <Alerts /> */}
        </>
    );
}

export default App;
