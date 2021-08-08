import React, {useContext} from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeflex/primeflex.css";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import ScrollToTop from "./Hooks/ScrollToTop";
import CreatePost from "./Pages/CreatePost";
import Post from "./Components/Post";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
    return (
        <Router>
            <ScrollToTop>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>

                    <Route exact path={"/posts"}>
                        <Posts/>
                    </Route>
                    <ProtectedRoute exact path={"/posts/create"} component={CreatePost}/>
                    <Route exact path={"/posts/:post_id"}>
                        <Post/>
                    </Route>
                </Switch>
            </ScrollToTop>
        </Router>
    );
}

export default App;
