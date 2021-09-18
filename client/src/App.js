import React, { useContext } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import ScrollToTop from "./Hooks/ScrollToTop";
import CreatePost from "./Pages/CreatePost";
import Post from "./Components/Post";
import ProtectedRoute from "./Components/ProtectedRoute";
import Contact from "./Pages/Contact";
import UpdatePost from "./Pages/UpdatePost";
import NotFound from "./Pages/NotFound";
import CreateTeacher from "./Pages/CreateTeacher";
import Teachers from "./Pages/Teachers";
import UpdateTeacher from "./Pages/UpdateTeacher";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path={"/posts"}>
            <Posts />
          </Route>
          <Route exact path={"/posts/:post_id"}>
            <Post />
          </Route>
          <ProtectedRoute exact path={"/createPost"} component={CreatePost} />
          <ProtectedRoute
            exact
            path={"/posts/update/:post_id"}
            component={UpdatePost}
          />


          <Route exact path={"/teachers"}>
            <Teachers />
          </Route>
          <ProtectedRoute
            exact
            path={"/teachers/create"}
            component={CreateTeacher}
          />
          <ProtectedRoute
            exact
            path={"/teachers/update/:teacher_id"}
            component={UpdateTeacher}
          />

          <Route exact path={"/contact"}>
            <Contact />
          </Route>
          <Route path="" component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
