import { Route, Switch } from "react-router-dom";
import React from "react";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import PrivateRouting from "./PrivateRouting";

function MainRouter(props) {
    return (
        <>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/login" exact component={LoginPage} />
                <PrivateRouting path="/dashboard"></PrivateRouting>
            </Switch>
        </>
    );
}

export default MainRouter;
