import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function PaidRoute(props) {
    const isPaid = useSelector((state) => state.user.isPaid);
    const { children, ...others } = props;
    return (
        <Route
            {...others}
            render={({ location }) =>
                !isPaid ? (
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

export default PaidRoute;
