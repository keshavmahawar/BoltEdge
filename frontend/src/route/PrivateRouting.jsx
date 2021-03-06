import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function PrivateRouting(props) {
    const authToken = useSelector((state) => state.user.authToken);
    const { children, ...others } = props;
    return (
        <Route
            {...others}
            render={({ location }) =>
                !authToken ? (
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

export default PrivateRouting;
