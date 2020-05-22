import React from "react";
import {useApolloClient} from "@apollo/react-hooks";
import {IconButton} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function LogoutButton() {
    const client = useApolloClient();

    return (
        <IconButton onClick={() => {
            client.writeData({data: { isLoggedIn: false }});
            localStorage.removeItem("token")
        }}>
            <ExitToAppIcon />
        </IconButton>
    );
}

export default LogoutButton;
