import React, {useState} from "react";
import FormTextField from "../components/FormTextField";
import {Typography, Button} from "@material-ui/core";
import {
    RootContainer,
    StyledForm,
    ButtonWrapper,
    ResponsiveContainer,
    ErrorWrapper
} from "../components/ResponsiveFormContainer";
import {useApolloClient, useMutation} from "@apollo/react-hooks";
import {Link} from "react-router-dom";
import {routingPaths} from "../__constants__";
import {LOGIN_USER} from "../api/queries";
import {handleChange, handleFormFieldError} from "../__helper__/formValidation";

function LoginPage() {

    const client = useApolloClient();
    const [login, {loading, error}] = useMutation(LOGIN_USER,
        {
            onCompleted({login}) {
                localStorage.setItem("token", login.token);
                client.writeData({data: {isLoggedIn: true}});
            }
        });

    const [inputs, setInputs] = useState({
        username: "",
        usernameError: "",
        password: "",
        passwordError: ""
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let formError = false;
        formError = handleFormFieldError(setInputs, "username", inputs.username, "Enter a username") || formError;
        formError = handleFormFieldError(setInputs, "password", inputs.password, "Enter a password") || formError;
        if (!formError) {
            login({
                variables: {
                    username: inputs.username,
                    password: inputs.password
                }
            }).catch(error => console.log(error));
        }
    }

    return (
        <RootContainer>
            <ResponsiveContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <Typography variant={"h4"} gutterBottom>{"Movie Library"}</Typography>
                    <Typography variant={"h5"} gutterBottom>{"Login"}</Typography>

                    <FormTextField
                        label={"Username"}
                        name={"username"}
                        value={inputs.username}
                        onChange={e => handleChange(e, setInputs)}
                        error={!!inputs.usernameError}
                        helperText={inputs.usernameError}
                        autoFocus
                    />
                    <FormTextField
                        label={"Password"}
                        name={"password"}
                        type="password"
                        value={inputs.password}
                        onChange={e => handleChange(e, setInputs)}
                        error={!!inputs.passwordError}
                        helperText={inputs.passwordError}
                    />

                    {error && <ErrorWrapper><Typography variant={"body1"}>{error?.message}</Typography> </ErrorWrapper>}

                    <ButtonWrapper>
                        <Button
                            variant="text"
                            color="primary"
                            component={Link}
                            to={routingPaths.register}
                        >
                            {"Create Account"}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {"Login"}
                        </Button>
                    </ButtonWrapper>

                </StyledForm>
            </ResponsiveContainer>
        </RootContainer>
    );
}

export default LoginPage;
