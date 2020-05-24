import React, {useState} from "react";
import styled from "styled-components";
import {Button, Typography, TextField, IconButton} from "@material-ui/core";
import {Movie} from "../api/types";
import {KeyboardDatePicker} from "@material-ui/pickers";
import ClearIcon from '@material-ui/icons/Clear';


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
        newActor: "",
        newActorError: "",
    });

    const [actors, setActors] = useState<string[]>(props.movie.actors.map(actor => actor.name));
    const [actorInputHasFocus, setActorInputHasFocus] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

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

    function handleFormFieldError(name: string, value: string, message: string): boolean {
        setInputs(inputs => ({...inputs, [name + "Error"]: ""}));
        if (value === "") {
            setInputs(inputs => ({...inputs, [name + "Error"]: message}));
            return true;
        }
        return false;
    }

    function clearActor(name: string) {
        setActors(actors.filter(a => a !== name));
    }

    function addActor() {
        let formError = handleFormFieldError("newActor", inputs.newActor, "Enter a name");
        if (actors.filter(a => a === inputs.newActor).length > 0) {
            formError = true;
            setInputs(inputs => ({...inputs, newActorError: "Actor already added"}));
        }
        if (!formError) {
            setActors([...actors, inputs.newActor]);
            setInputs(inputs => ({...inputs, newActor: ""}));
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (actorInputHasFocus) {
            return;
        }
        let formError = false;
        formError = handleFormFieldError("name", inputs.name, "Enter a title") || formError;
        formError = handleFormFieldError("durationMinutes", inputs.durationMinutes, "Enter a duration") || formError;
        let durationSeconds = parseInt(inputs.durationMinutes) * 60;
        if (!formError) {
            props.onSave({
                id: props.movie.id,
                name: inputs.name,
                durationSeconds: durationSeconds,
                releaseDate: inputs.releaseDate.toDateString(),
                actors: actors.map(a => {
                    return {id: "", name: a}
                })
            });
        }
    }

    function handleActorFieldKeyPress(e: React.KeyboardEvent) {
        if (e.keyCode === 13) {
            addActor();
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <TitleDiv><Typography variant={"h5"}>{props.title}</Typography></TitleDiv>
            <ContentWrapper>
                <LineWrapper>
                    <StyledTextField
                        label={"Title"}
                        name={"name"}
                        value={inputs.name}
                        error={!!inputs.nameError}
                        helperText={inputs.nameError}
                        onChange={handleChange}
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
                <ActorWrapper>
                    <ActorLabel variant={"body2"}>{"Actors: "}</ActorLabel>
                    <ActorNamesList>

                        {actors.map(a =>
                            <ActorDiv key={a}>
                                <Typography variant={"body1"}>
                                    {a}
                                </Typography>
                                <IconButton
                                    size={"small"}
                                    className={"table-action-button"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearActor(a);
                                    }}
                                >
                                    <ClearIcon fontSize={"small"}/>
                                </IconButton>
                            </ActorDiv>)}
                    </ActorNamesList>
                </ActorWrapper>
                <LineWrapper>
                    <StyledTextField
                        label={"New Actor"}
                        name={"newActor"}
                        value={inputs.newActor}
                        error={!!inputs.newActorError}
                        helperText={inputs.newActorError}
                        onChange={handleChange}
                        margin={"dense"}
                        onFocus={() => setActorInputHasFocus(true)}
                        onBlur={() => setActorInputHasFocus(false)}
                        onKeyDown={handleActorFieldKeyPress}
                    />
                    <Button onClick={() => addActor()}>
                        {"Add"}
                    </Button>
                </LineWrapper>


            </ContentWrapper>
            <ActionDiv>
                <Button color={"primary"} onClick={props.onCancel}>{"Back"}</Button>
                <Spacer/>
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

const ActorWrapper = styled("div")`
    margin: 12px;
    flex-grow: 1;
`;


const ActorNamesList = styled("div")`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
const ActorLabel = styled(Typography)`
    color: rgba(0, 0, 0, 0.54);
    font-size: 1rem;
`;

const ActorDiv = styled("div")`
    display: flex;
    flex-direction: row;
    margin-right: 4px;
    flex-wrap: nowrap;
    text-wrap: none;
    > p {
    text-wrap: none;
    }
`;

export default MovieCreateEditDialog;
