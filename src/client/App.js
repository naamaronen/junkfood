import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Home from "./Home";
import Reviews from "./components/Reviews";
import RestSearchResult from "./components/RestSearchResult";
import UserSearchResult from "./components/UserSearchResult";
import Profile from "./components/auth/Profile";

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/restaurants/:id" children={<Reviews />} />
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/search_user">
            <UserSearchResult />
          </Route>
          <Route path="/search_rest">
            <RestSearchResult />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}
