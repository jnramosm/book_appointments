import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/privateroute";
import Register from "./pages/register";
import Settings from "./pages/settings";
import Login from "./pages/login";
import Appointments from "./pages/appointments";
import CustomLayout from "./components/layout";
import "../node_modules/antd/dist/antd.css";
import user from "./user/user";

function App() {
  return (
    <Router>
      <CustomLayout>
        <Switch>
          <Route exact path="/" component={Settings} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/appointments" component={Appointments} />
          <Route
            path="/logout"
            render={(props) => {
              user.setAuthentication(false);
              user.setEmail("");
              return (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            }}
          />
        </Switch>
      </CustomLayout>
    </Router>
  );
}

export default App;
