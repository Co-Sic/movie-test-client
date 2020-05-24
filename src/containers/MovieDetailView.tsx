import styled from "styled-components";
import React from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Movie, Actor} from "../api/types";
import formatDuration from "../__helper__/formatDuration";
import EditIconOutlined from "@material-ui/icons/EditOutlined";
import DeleteIconOutlined from "@material-ui/icons/DeleteOutlined";


interface MovieDetailViewProps {
    movie: Movie;
    onDialogClose: () => void;
    onDeleteMovie: (movie: Movie) => void;
    onEditMovie: (movie: Movie) => void;
}

function MovieDetailView(props: MovieDetailViewProps) {

    return (
        <RootDiv>
            <TitleDiv>
                <TitleWrapper>
                    <Typography variant={"h5"}>
                        {props.movie.name}
                    </Typography>

                </TitleWrapper>
                <TitleActionsDiv>
                    <Tooltip title={"Edit Movie"}>
                        <IconButton
                            size={"small"}
                            className={"table-action-button"}
                            onClick={(e) => {e.stopPropagation(); props.onEditMovie(props.movie);}}
                        >
                            <EditIconOutlined fontSize={"small"}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete Movie"}>
                        <IconButton
                            size={"small"}
                            className={"table-action-button"}
                            onClick={(e) => {e.stopPropagation(); props.onDeleteMovie(props.movie);}}
                        >
                            <DeleteIconOutlined fontSize={"small"}/>
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={props.onDialogClose}>
                        <CloseIcon />
                    </IconButton>
                </TitleActionsDiv>
            </TitleDiv>
            <DetailDiv>
                <LineWrapper>
                    <StyledLabel>{"Release Date:"}</StyledLabel>
                    {props.movie.releaseDate}
                </LineWrapper>
                <LineWrapper>
                    <StyledLabel>{"Duration:"}</StyledLabel>
                    {formatDuration(props.movie.durationSeconds)}
                </LineWrapper>
                <LineWrapper>
                    <StyledLabel>{"Actors: "}</StyledLabel>

                    {props.movie.actors.map((actor: Actor, index: number) => {
                        if (index < props.movie.actors.length - 1) {
                            return actor.name + ", "
                        }
                        return actor.name;
                    })}

                </LineWrapper>
            </DetailDiv>
        </RootDiv>
        // + (index < props.movie.actors.length - 1) ? ", " : ""
    );
}

/**
 * Styled Components
 */

const StyledLabel = styled("p")`
    color: #80868b;
    min-width: 100px;
    margin-right: 10px;
`;
const RootDiv = styled("div")`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const TitleDiv = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 10px 10px 20px;
`;

const TitleWrapper = styled("div")`
    flex-grow: 1;
`;
const TitleActionsDiv = styled("div")`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
`;

const DetailDiv = styled("div")`
    border-top: 1px solid ${p => p.theme.palette.border.default};
    padding: 20px;
`;

const LineWrapper = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 16px;
`;

export default MovieDetailView;
