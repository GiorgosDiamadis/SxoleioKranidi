import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "../useAuth";

const isAuthed = require("../Utils/isAuthenticated")

function ProtectedRoute({component: Component, ...restOfProps}) {
    const {user} = isAuthed();

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                user === null ? <Redirect to="/login"/> : <Component {...props} />
            }
        />
    );
}

export default ProtectedRoute;