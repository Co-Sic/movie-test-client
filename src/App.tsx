import React from "react";
import withStyles from "./withStyles";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {Switch, Route, Redirect} from "react-router-dom";
import Header from "./containers/Header";
import HomePage from "./pages/HomePage";
import {routingPaths} from "./__constants__";

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

function App() {

    const {data} = useQuery(IS_LOGGED_IN);

    if (!data.isLoggedIn) {
        return (
            <Switch>
                <Route
                    path={routingPaths.login}
                    exact
                    component={LoginPage}
                />
                <Route
                    path={routingPaths.register}
                    exact
                    component={RegisterPage}
                />
                <Route
                    path={""}
                    component={() => <Redirect to={routingPaths.login} />}
                />
            </Switch>
        );
    } else {
        return (
            <React.Fragment>
                <Header/>
                <Switch>
                    <Route
                        path={routingPaths.home}
                        component={HomePage}
                    />
                    <Route
                        path={"/"}
                        component={() => <Redirect to={routingPaths.home} />}
                    />
                </Switch>
            </React.Fragment>
        );
    }

}

export default withStyles(App);
