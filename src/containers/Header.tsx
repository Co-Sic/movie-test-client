import React from "react";
import LogoutButton from "./LogoutButton";
import styled from "styled-components";
import {Typography, SvgIcon} from "@material-ui/core";
import {ReactComponent as MovieIcon} from "../__assets__/movie-icon.svg";

function Header() {
    return (
        <RootDiv>
            <TitleWrapper>
                <StyledMovieIcon>
                    <MovieIcon />
                </StyledMovieIcon>
                <Typography variant={"h4"}>
                    Movie Library
                </Typography>
            </TitleWrapper>
            <LogoutButton/>
        </RootDiv>
    );
}

/**
 * Styled Components
 */

const RootDiv = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 20px;
    border-bottom: 1px solid ${p => p.theme.palette.border.default};
`;

const TitleWrapper = styled("div")`
    display: flex;
    flex-direction: row;
`;

const StyledMovieIcon = styled(SvgIcon)`
margin-right: 20px;
font-size: 38px;
`;

export default Header;
