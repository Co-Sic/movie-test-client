import React, {useState} from "react";
import styled from "styled-components";
import {TextField} from "@material-ui/core";
import {Movie} from "../api/types";
import {KeyboardDatePicker} from "@material-ui/pickers";
import StyledDialog from "../components/StyledDialog";
import {handleChange, handleFormFieldError} from "../__helper__/formValidation";
import AddActors from "./AddActors";


interface CreateEditDialogProps {
    onCancel: () => void,
    onSave: (movie: Movie) => void,
    title: string,
    movie: Movie,
}

function CreateEditMovieDialog(props: CreateEditDialogProps) {

    const [inputs, setInputs] = useState({
        name: props.movie.name,
        nameError: "",
        durationMinutes: "" + props.movie.durationSeconds / 60,
        durationMinutesError: "",
        releaseDate: new Date(props.movie.releaseDate),
    });

    const [actors, setActors] = useState<string[]>(props.movie.actors.map(actor => actor.name));
    const [actorInputHasFocus, setActorInputHasFocus] = useState(false);

    function handleChangeNumber(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        const onlyNumbers = value.replace(/[^0-9]/g, "");
        setInputs(inputs => ({...inputs, [name]: onlyNumbers}));
    }

    function handleDateChange(date: Date | null) {
        if (date !== null) {
            setInputs(inputs => ({...inputs, releaseDate: date}));
        }
    }
    
    function handleSubmit() {
        if (actorInputHasFocus) {
            return;
        }
        let formError = false;
        formError = handleFormFieldError(setInputs, "name", inputs.name, "Enter a title") || formError;
        formError = handleFormFieldError(setInputs, "durationMinutes", inputs.durationMinutes, "Enter a duration") || formError;
        let durationSeconds = parseInt(inputs.durationMinutes) * 60;
        if (!formError) {
            props.onSave({
                id: props.movie.id,
                name: inputs.name,
                durationSeconds: durationSeconds,
                releaseDate: inputs.releaseDate.toDateString(),
                actors: actors.map(a => {
                    return {id: "", name: a}
                }),
                averageRating: 0,
                ratingCount: 0,
            });
        }
    }

    return (
        <StyledDialog title={props.title} onCancel={props.onCancel} onSave={handleSubmit}>
            <ContentWrapper>
                <LineWrapper>
                    <StyledTextField
                        label={"Title"}
                        name={"name"}
                        value={inputs.name}
                        error={!!inputs.nameError}
                        helperText={inputs.nameError}
                        onChange={(e) => handleChange(e, setInputs)}
                        margin={"dense"}
                        autoFocus
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
                <AddActors
                    actorNames={actors}
                    onActorNamesChange={(a: string[]) => setActors(a)}
                    onActorInputFocusChange={setActorInputHasFocus}
                />
            </ContentWrapper>
        </StyledDialog>
    );

}

/**
 * Styled Components
 */
const ContentWrapper = styled("div")`
    padding: 20px;
    border-bottom: 1px solid ${p => p.theme.palette.border.default};
    flex-grow: 1;
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

export default CreateEditMovieDialog;
