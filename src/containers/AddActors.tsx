import React, {useState} from "react";
import {Button, IconButton, TextField, Typography} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import {handleChange, handleFormFieldError} from "../__helper__/formValidation";

interface AddActorsProps {
    actorNames: string[];
    onActorNamesChange: (actors: string[]) => void;
    onActorInputFocusChange: (focus: boolean) => void;
}

function AddActors(props: AddActorsProps) {

    const { actorNames, onActorNamesChange } = props;
    const [inputs, setInputs] = useState({
        newActorName: "",
        newActorNameError: "",
    });

    function clearActor(name: string) {
        onActorNamesChange(actorNames.filter(a => a !== name));
    }

    function addActor() {
        let formError = handleFormFieldError(setInputs, "newActorName", inputs.newActorName, "Enter a name");
        if (actorNames.filter(a => a === inputs.newActorName).length > 0) {
            formError = true;
            setInputs(inputs => ({...inputs, newActorNameError: "Actor already added"}));
        }
        if (!formError) {
            onActorNamesChange([...actorNames, inputs.newActorName]);
            setInputs(inputs => ({...inputs, newActorName: ""}));
        }
    }

    function handleActorFieldKeyPress(e: React.KeyboardEvent) {
        if (e.keyCode === 13) {
            addActor();
        }
    }

    return(
        <div>
            <ActorWrapper>
                <ActorLabel variant={"body2"}>{"Actors: "}</ActorLabel>
                <ActorNamesList>

                    {actorNames.map(a =>
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
                    name={"newActorName"}
                    value={inputs.newActorName}
                    error={!!inputs.newActorNameError}
                    helperText={inputs.newActorNameError}
                    onChange={(e) => handleChange(e, setInputs)}
                    margin={"dense"}
                    onFocus={() => props.onActorInputFocusChange(true)}
                    onBlur={() => props.onActorInputFocusChange(false)}
                    onKeyDown={handleActorFieldKeyPress}
                />
                <Button variant={"outlined"} onClick={() => addActor()}>
                    {"Add"}
                </Button>
            </LineWrapper>
        </div>
    );
}

/**
 * Styled Components
 */
const StyledTextField = styled(TextField)`
    margin: 12px;
    flex-grow: 1;
`;

const LineWrapper = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
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
    border: 1px solid grey;
    border-radius: 10px;
    padding: 2px 4px;
    background-color: #e4e4e4;
`;

export default AddActors;
