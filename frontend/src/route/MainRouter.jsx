import { Route, Switch } from "react-router-dom";
import React from "react";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRouting from "./PrivateRouting";
import Admin from "../pages/Admin";
import EachUserDetails from "../components/EachUserDetails";
import AdminLoginPage from '../pages/AdminLogin'

function MainRouter(props) {
    return (
        <>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signup" exact component={Register} />
                <PrivateRouting path="/dashboard">
                    <Route path="/dashboard/" component={Dashboard} />
                </PrivateRouting>
                <Route path="/admin" exact component={Admin} />
                <Route path={`/admin/:id`}
                    render={(props) => <EachUserDetails {...props} />} />
                <Route path="/adminlogin" exact component={AdminLoginPage} />
            </Switch>
        </>
    );
}

export default MainRouter;
