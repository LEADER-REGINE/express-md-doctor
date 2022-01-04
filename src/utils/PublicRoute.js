import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./isLoggedin";
export default function PublicRoute({
    component: Component,
    restricted,
    ...rest
}) {
    return (
        <Route
            {...rest}
            component={(props) =>
                isLogin() && restricted ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}