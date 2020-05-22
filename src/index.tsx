import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {ApolloProvider} from "@apollo/react-hooks";
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {BrowserRouter} from "react-router-dom";

const cache = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: "http://localhost:4000/",
        headers: {
            authorization: localStorage.getItem("token"),
        },
    }),
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem("token"),
    },
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
