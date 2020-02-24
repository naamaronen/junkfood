import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import RestSearchResult from "./components/RestSearchResult";
import UserSearchResult from "./components/UserSearchResult";
import Profile from "./components/auth/Profile";
import RestReviews from "./components/RestReviews";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route
            path="/user_profile/:id"
            render={props => <UserProfile {...props} isAuthed={true} />}
          />
          <Route exact path="/search_user">
            <UserSearchResult />
          </Route>
          <Route
            exact
            path="/search_rest"
            render={props => <RestSearchResult {...props} isAuthed={true} />}
          />
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route
            path="/:id"
            render={props => <RestReviews {...props} isAuthed={true} />}
          />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
