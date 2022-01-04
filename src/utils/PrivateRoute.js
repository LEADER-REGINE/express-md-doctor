import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./isLoggedin";

export default function PrivateRoute({
    component: Component,
    ...rest
}) {
    return (
        <Route
            {...rest}
            component={(props) =>
                isLogin() ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}
