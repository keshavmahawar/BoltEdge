import { Route, Switch } from "react-router-dom";
import React from "react";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import PrivateRouting from "./PrivateRouting";
import PaidRoute from "./PaidRoute";
import VerifiedRoute from "./VerifiedRoute";

function MainRouter(props) {
    return (
        <>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/login" exact component={LoginPage} />
                <PrivateRouting path="/dashboard">
                    <Route
                        path="/dashboard/"
                        exact
                        render={() => <div>home</div>}
                    />
                    <Route
                        path="/dashboard/demo"
                        render={() => <div>demo</div>}
                    />
                    <Route
                        path="/dashboard/pay"
                        render={() => <div>pay</div>}
                    />
                    <PaidRoute path="/dashboard">
                        <Route
                            path="/details"
                            render={() => <div>details </div>}
                        />
                        <VerifiedRoute path="/dashboard">
                            <Route
                                path="/insights"
                                render={() => <div>insights </div>}
                            />
                            <Route
                                path="/report"
                                render={() => <div>report </div>}
                            />
                        </VerifiedRoute>
                    </PaidRoute>
                </PrivateRouting>
            </Switch>
        </>
    );
}

export default MainRouter;
