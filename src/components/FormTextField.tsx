import React from "react";
import styled from "styled-components";
import {TextField, TextFieldProps} from "@material-ui/core";


function FormTextField(props: TextFieldProps) {

    return (
        <StyledTextField
            variant={"outlined"}
            {...props}
        />
    );
}

/**
 * Styled Components
 */

const StyledTextField = styled(TextField)`
    margin: 10px 0 10px 0;
`;

export default FormTextField;
