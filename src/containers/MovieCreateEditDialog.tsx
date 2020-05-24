import React, {useState} from "react";
import styled from "styled-components";
import {Button, Typography, TextField} from "@material-ui/core";
import { Movie } from "../api/types";
import {KeyboardDatePicker} from "@material-ui/pickers";



interface CreateEditDialogProps {
    onCancel: () => void,
    onSave: (movie: Movie) => void,
    title: string,
    movie: Movie,
}

function MovieCreateEditDialog(props: CreateEditDialogProps) {

    const [inputs, setInputs] = useState({
        name: props.movie.name,
        nameError: "",
        durationMinutes: "" + props.movie.durationSeconds / 60,
        durationMinutesError: "",
        releaseDate: new Date(props.movie.releaseDate),
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleChangeNumber (e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        const onlyNumbers = value.replace(/[^0-9]/g, "");
        setInputs(inputs => ({...inputs, [name]: onlyNumbers}));
    }

    function handleDateChange (date: Date | null) {
        if (date !== null) {
            setInputs(inputs => ({...inputs, releaseDate: date}));
        }

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
        formError = handleFormFieldError("name", inputs.name, "Enter a title") || formError;
        formError = handleFormFieldError("durationMinutes", inputs.durationMinutes, "Enter a duration") || formError;
        let durationSeconds = parseInt(inputs.durationMinutes) * 60;
        if (!formError) {
           props.onSave({id: props.movie.id, name: inputs.name, durationSeconds: durationSeconds, actors: props.movie.actors, releaseDate: inputs.releaseDate.toDateString()});
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <TitleDiv><Typography variant={"h5"}>{props.title}</Typography></TitleDiv>
            <ContentWrapper >
                <LineWrapper>
                    <StyledTextField
                        label={"Title"}
                        name={"name"}
                        value={inputs.name}
                        error={!!inputs.nameError}
                        helperText={inputs.nameError}
                        onChange={handleChange}
                        margin={"dense"}
                    />
                </LineWrapper>
                <LineWrapper>
                    <StyledKeyboardDatePicker
                        label={"Release Date"}
                        name={"releaseDate"}
                        disableToolbar
                        variant={"inline"}
                        format={"yyyy/MM/dd"}
                        margin={"dense"}
                        value={inputs.releaseDate}
                        onChange={handleDateChange}
                    />
                </LineWrapper>
                <LineWrapper>
                    <StyledTextField
                        label={"Duration in minutes"}
                        name={"durationMinutes"}
                        value={inputs.durationMinutes}
                        error={!!inputs.durationMinutesError}
                        helperText={inputs.durationMinutesError}
                        onChange={handleChangeNumber}
                        margin={"dense"}
                    />
                </LineWrapper>
            </ContentWrapper>
            <ActionDiv>
                <Button color={"primary"} onClick={props.onCancel}>{"Back"}</Button>
                <Spacer />
                <Button color={"primary"} type={"submit"}>{"Finish"}</Button>
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
    padding: 20px;
    border-bottom: 1px solid ${p => p.theme.palette.border.default};
`;

const ContentWrapper = styled("div")`
    padding: 20px;
    border-bottom: 1px solid ${p => p.theme.palette.border.default};
    flex-grow: 1;
`;

const ActionDiv = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px 20px;
`;
const Spacer = styled("div")`
    width: 30px;
`;

const StyledTextField = styled(TextField)`
    margin: 12px;
    flex-grow: 1;
`;

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
    margin: 12px;
    flex-grow: 1;
`;

const LineWrapper = styled("div")`
    display: flex;
    flex-direction: row;
`;

export default MovieCreateEditDialog;
