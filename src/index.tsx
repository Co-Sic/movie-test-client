import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {ApolloProvider} from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import {BrowserRouter} from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
};

let ip = process.env.REACT_APP_SERVER_IP;
if (ip === null || ip === undefined) {
    ip = "localhost";
}
let port = process.env.REACT_APP_SERVER_PORT;
if (port === null || port === undefined) {
    port = "4000";
}

const client = new ApolloClient({
    uri: `http://${ip}:${port}`,
    request: (operation: any) => {
        operation.setContext({
            headers: {
                authorization: getToken(),
            },
        });
    },
});

client.writeData({
    data: {
        isLoggedIn: !!getToken(),
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
