import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function VerifiedRoute(props) {
    const isVerified = useSelector((state) => state.user.isVerified);
    const { children, ...others } = props;
    return (
        <Route
            {...others}
            render={({ location }) =>
                !isVerified ? (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
}

export default VerifiedRoute;
