import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/Users";
import Profile from "./components/Profile";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./app.scss";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("https://api.github.com/users").then((response) => {
      const api = response.data;
      setData(api);
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Users />
          </Route>
          {data?.map((user) => {
            return (
              <Route exact path={`/${user.login}`} key={user.id}>
                <Profile login={user.login} />
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
