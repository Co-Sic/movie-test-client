import React, {ChangeEvent, useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {
    ButtonWrapper,
    ErrorWrapper,
    ResponsiveContainer,
    RootContainer,
    StyledForm
} from "../components/ResponsiveFormContainer";
import {Button, Typography} from "@material-ui/core";
import FormTextField from "../components/FormTextField";
import {Link, Redirect} from "react-router-dom";
import gql from "graphql-tag";
import {routingPaths} from "../__constants__";

export const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password){id}
  }
`;

function RegisterPage(){
    const [login, {loading, error}] = useMutation(REGISTER_USER);
    const [registerSuccessful, setRegisterSuccessful] = useState(false);

    const [inputs, setInputs] = useState({
        username: "",
        usernameError: "",
        password: "",
        passwordError: "",
        passwordRepeated: "",
        passwordRepeatedError: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleFormFieldError(name: string, value: string, message: string): boolean {
        setInputs(inputs => ({...inputs, [name + "Error"]: ""}));
        if (value === "") {
            setInputs(inputs => ({...inputs, [name + "Error"]: message}));
            return true;
        }
        return false;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let formError = false;
        formError = handleFormFieldError("username", inputs.username, "Enter a username") || formError;
        formError = handleFormFieldError("password", inputs.password, "Enter a password") || formError;
        formError = handleFormFieldError("passwordRepeated", inputs.passwordRepeated, "Repeat password") || formError;
        if (!formError && inputs.password !== inputs.passwordRepeated) {
            setInputs(inputs => ({...inputs, passwordRepeatedError:"Passwords must match"}));
            formError = true;
        }
        if (!formError) {
            login({ variables: {username: inputs.username, password: inputs.password}}).then(() => setRegisterSuccessful(true)).catch(error => console.log(error));
        }
    }

    // Navigate to login after successful registration
    if (registerSuccessful) {
        return(<Redirect to={"/login"} />)
    }
    return (
        <RootContainer>
            <ResponsiveContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <Typography variant={"h4"} gutterBottom>{"Movie Library"}</Typography>
                    <Typography variant={"h5"} gutterBottom>{"Sign up"}</Typography>

                    <FormTextField
                        label={"Username"}
                        name={"username"}
                        value={inputs.username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                        error={!!inputs.usernameError}
                        helperText={inputs.usernameError}
                        autoFocus
                    />
                    <FormTextField
                        label={"Password"}
                        name={"password"}
                        type="password"
                        value={inputs.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                        error={!!inputs.passwordError}
                        helperText={inputs.passwordError}
                    />

                    <FormTextField
                        label={"Repeat Password"}
                        name={"passwordRepeated"}
                        type="password"
                        value={inputs.passwordRepeated}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                        error={!!inputs.passwordRepeatedError}
                        helperText={inputs.passwordRepeatedError}
                    />

                    {error && <ErrorWrapper><Typography variant={"body1"}>{error?.message}</Typography> </ErrorWrapper>}

                    <ButtonWrapper>
                        <Button
                            variant="text"
                            color="primary"
                            component={Link}
                            to={routingPaths.login}
                        >
                            {"Login"}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {"Sign up"}
                        </Button>
                    </ButtonWrapper>

                </StyledForm>
            </ResponsiveContainer>
        </RootContainer>
    );
}

export default RegisterPage;
