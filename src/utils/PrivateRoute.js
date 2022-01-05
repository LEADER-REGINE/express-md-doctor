import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./isLoggedin";

export default function PrivateRoute({
    component: Component,
    isAuthenticated,
    ...rest
}) {
    return (
        <Route
            {...rest}
            component={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}
