import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function VerifiedRoute(props) {
    const isVerified = useSelector((state) => state.user.isVerified);
    const isPaid = useSelector((state) => state.user.isPaid);
    const { component: Component, ...others } = props;
    return (
        <Route
            {...others}
            render={({ location }) =>
                !isVerified || !isPaid ? (
                    <Redirect
                        to={{
                            pathname: "dashboard/demo",
                            state: { from: location },
                        }}
                    />
                ) : (
                    <Component />
                )
            }
        />
    );
}

export default VerifiedRoute;
