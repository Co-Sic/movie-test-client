import React from "react";
import {useApolloClient} from "@apollo/react-hooks";
import {IconButton} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styled from "styled-components";

function LogoutButton() {
    const client = useApolloClient();

    return (
        <StyledIconButton onClick={() => {
            client.writeData({data: { isLoggedIn: false }});
            localStorage.removeItem("token")
        }}>
            <ExitToAppIcon />
        </StyledIconButton>
    );
}

const StyledIconButton = styled(IconButton)`
    color: rgba(0, 0, 0, 0.87);
`;

export default LogoutButton;
