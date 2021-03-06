import React, {useState} from "react";
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
import {routingPaths} from "../__constants__";
import {REGISTER_USER} from "../api/queries";
import {handleChange, handleFormFieldError} from "../__helper__/formValidation";


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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let formError = false;
        formError = handleFormFieldError(setInputs, "username", inputs.username, "Enter a username") || formError;
        formError = handleFormFieldError(setInputs, "password", inputs.password, "Enter a password") || formError;
        formError = handleFormFieldError(setInputs, "passwordRepeated", inputs.passwordRepeated, "Repeat password") || formError;
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

                    <FormTextField
                        label={"Repeat Password"}
                        name={"passwordRepeated"}
                        type="password"
                        value={inputs.passwordRepeated}
                        onChange={e => handleChange(e, setInputs)}
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
