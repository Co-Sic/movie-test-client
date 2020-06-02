import React from "react";
import styled from "styled-components";
import {Button, IconButton, Typography} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";


interface StyledDialogProps {
    children?: React.ReactNode,
    title: string,
    onCancel: () => void,
    onSave: () => void,
}

function StyledDialog(props: StyledDialogProps) {

    return (
        <StyledForm onSubmit={(e) => {e.preventDefault(); props.onSave();}}>

            <TitleDiv>
                <ResponsiveIconButton onClick={props.onCancel}>
                    <CloseIcon />
                </ResponsiveIconButton>
                <StyledTitle variant={"h5"}>
                    {props.title}
                </StyledTitle>
                <ResponsiveIconButton type={"submit"}>
                    <DoneIcon />
                </ResponsiveIconButton>
            </TitleDiv>
            <ContentWrapper>
                {props.children}
            </ContentWrapper>
            <ActionDiv>
                <Button variant={"outlined"} onClick={props.onCancel}>{"Back"}</Button>
                <Spacer/>
                <Button variant={"contained"} color={"primary"} type={"submit"}>{"Save"}</Button>
            </ActionDiv>
        </StyledForm>
    );
}

/**
 * Styled Components
 */

const StyledForm = styled("form")`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const TitleDiv = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid ${p => p.theme.palette.border.default};
    @media(max-width: ${p => p.theme.breakpoints.values.sm}px) {
        padding: 6px 10px;
    }
`;

const ResponsiveIconButton = styled(IconButton)`
    @media(min-width: ${p => p.theme.breakpoints.values.sm}px) {
        display: none;
    }
`;

const StyledTitle = styled(Typography)`
    flex-grow: 1;
    margin-right: auto;
`;

const ContentWrapper = styled("div")`
    padding: 20px 30px;
    border-bottom: 1px solid ${p => p.theme.palette.border.default};
    flex-grow: 1;
    @media(max-width: ${p => p.theme.breakpoints.values.sm}px) {
        padding: 20px 10px;
    }
`;

const ActionDiv = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px 30px;
    @media(max-width: ${p => p.theme.breakpoints.values.sm}px) {
        display: none;
    }
`;
const Spacer = styled("div")`
    width: 30px;
`;

export default StyledDialog;
