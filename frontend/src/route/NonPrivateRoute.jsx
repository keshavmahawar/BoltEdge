import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
function NonPrivateRoute(props) {
    const authToken = useSelector((state) => state.user.authToken);
    if (authToken)
        return (
            <Redirect
                to={{
                    pathname: "/dashboard",
                }}
            />
        );
    return null;
}

export default NonPrivateRoute;
