import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {ApolloProvider} from "@apollo/react-hooks";
import {ApolloClient, InMemoryCache, HttpLink, split, ApolloLink} from "apollo-boost";
import {BrowserRouter} from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {WebSocketLink} from "apollo-link-ws";
import {getMainDefinition} from "apollo-utilities";
import {setContext} from "apollo-link-context";
import {onError} from "apollo-link-error";
import * as serviceWorker from "./serviceWorker";

let ip = process.env.REACT_APP_SERVER_IP;
if (ip === null || ip === undefined) {
    ip = "localhost";
}
let port = process.env.REACT_APP_SERVER_PORT;
if (port === null || port === undefined) {
    port = "4000";
}

const wsLink = new WebSocketLink({
    uri: `ws://${ip}:${port}/graphql`,
    options: {
        reconnect: true,
    },
});

const httpLink = new HttpLink({uri: `http://${ip}:${port}`});

// Add token to every request from the local storage
const authLink = setContext((_, {headers, ...context}) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            ...(token ? {authorization: `Bearer ${token}`} : {}),
        },
        ...context,
    };
});

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) => {
                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
                // Log out user if token is invalid
                if (message === "Not authenticated!") {
                    client.writeData({data: {isLoggedIn: false}});
                    localStorage.removeItem("token")
                }
                return null;
            }
        );
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const link = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    ApolloLink.from([
        errorLink,
        authLink,
        httpLink,
    ]),
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

client.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem("token"),
    },
});

ReactDOM.render(
    <React.Fragment>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <App/>
                </MuiPickersUtilsProvider>
            </ApolloProvider>
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById("root")
);

//
serviceWorker.register();
