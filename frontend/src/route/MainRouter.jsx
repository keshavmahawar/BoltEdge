import { Route, Switch } from "react-router-dom";
import React from "react";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRouting from "./PrivateRouting";
import UserDetails from "../pages/UserDetails";

function MainRouter(props) {
    return (
        <>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signup" exact component={Register} />
                <PrivateRouting path="/dashboard">
                    <Route path="/dashboard/" component={Dashboard} />
                    <Route path="/dashboard/details" component={UserDetails} />
                </PrivateRouting>
            </Switch>
        </>
    );
}

export default MainRouter;
