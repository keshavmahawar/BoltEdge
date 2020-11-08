import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function PaidRoute(props) {
    const isPaid = useSelector((state) => state.user.isPaid);
    const { component: Component, ...others } = props;
    return (
        <Route
            {...others}
            render={({ location }) =>
                !isPaid ? (
                    <Redirect
                        to={{
                            pathname: "dashboard/pay",
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

export default PaidRoute;
