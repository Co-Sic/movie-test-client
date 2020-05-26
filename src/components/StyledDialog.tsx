import React from "react";
import styled from "styled-components";
import {Button, Typography} from "@material-ui/core";


interface StyledDialogProps {
    children?: React.ReactNode,
    title: string,
    onCancel: () => void,
    onSave: () => void,
}

function StyledDialog(props: StyledDialogProps) {

    return (
        <StyledForm onSubmit={(e) => {e.preventDefault(); props.onSave();}}>
            <TitleDiv><Typography variant={"h5"}>{props.title}</Typography></TitleDiv>
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
    padding: 20px 30px;
    border-bottom: 1px solid ${p => p.theme.palette.border.default};
`;

const ContentWrapper = styled("div")`
    padding: 20px 30px;
    border-bottom: 1px solid ${p => p.theme.palette.border.default};
    flex-grow: 1;
`;

const ActionDiv = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px 30px;
`;
const Spacer = styled("div")`
    width: 30px;
`;

export default StyledDialog;
