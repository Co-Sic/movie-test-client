import React from "react";
import styled from "styled-components";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Movie, Actor, GetAlreadyRated} from "../api/types";
import formatDuration from "../__helper__/formatDuration";
import EditIconOutlined from "@material-ui/icons/EditOutlined";
import DeleteIconOutlined from "@material-ui/icons/DeleteOutlined";
import {useQuery} from "@apollo/react-hooks";
import {GET_MOVIE_ALREADY_RATED} from "../api/queries";
import RatingsView from "./RatingsView";
import StarBorderIcon from "@material-ui/icons/StarBorder";

interface MovieDetailViewProps {
    movie: Movie;
    onDialogClose: () => void;
    onDeleteMovie: (movie: Movie) => void;
    onEditMovie: (movie: Movie) => void;
    onStartRating: () => void;
}

function MovieDetailView(props: MovieDetailViewProps) {

    const {
        data,
        loading,
        error
    } = useQuery<GetAlreadyRated>(GET_MOVIE_ALREADY_RATED, {variables: {movieId: props.movie.id}});

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    let alreadyRated = data.alreadyRated;
    console.log(data);
    let movie = props.movie;

    return (
        <RootDiv>
            <TitleDiv>
                <TitleWrapper>
                    <Typography variant={"h5"}>
                        {movie.name}
                    </Typography>

                </TitleWrapper>
                <TitleActionsDiv>
                    <Tooltip title={alreadyRated ? "Already Rated!" : "Rate Movie"}>
                        <IconButtonWrapper>
                            <IconButton
                                size={"small"}
                                className={"table-action-button"}
                                onClick={(e) => {e.stopPropagation(); props.onStartRating();}}
                                disabled={alreadyRated}
                            >
                                <StarBorderIcon fontSize={"small"}/>
                            </IconButton>
                        </IconButtonWrapper>
                    </Tooltip>
                    <Tooltip title={"Edit Movie"}>
                        <IconButton
                            size={"small"}
                            className={"table-action-button"}
                            onClick={(e) => {e.stopPropagation(); props.onEditMovie(movie);}}
                        >
                            <EditIconOutlined fontSize={"small"}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete Movie"}>
                        <IconButton
                            size={"small"}
                            className={"table-action-button"}
                            onClick={(e) => {e.stopPropagation(); props.onDeleteMovie(movie);}}
                        >
                            <DeleteIconOutlined fontSize={"small"}/>
                        </IconButton>
                    </Tooltip>
                    <IconButton
                        size={"small"}
                        className={"table-action-button"}
                        onClick={props.onDialogClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </TitleActionsDiv>
            </TitleDiv>
            <DetailDiv>
                <LineWrapper>
                    <StyledLabel>{"Release Date:"}</StyledLabel>
                    {movie.releaseDate}
                </LineWrapper>
                <LineWrapper>
                    <StyledLabel>{"Duration:"}</StyledLabel>
                    {formatDuration(movie.durationSeconds)}
                </LineWrapper>
                <LineWrapper>
                    <StyledLabel>{"Actors: "}</StyledLabel>

                    {movie.actors.map((actor: Actor, index: number) => {
                        if (index < movie.actors.length - 1) {
                            return actor.name + ", "
                        }
                        return actor.name;
                    })}

                </LineWrapper>
                <RatingsView movie={movie}/>
            </DetailDiv>
        </RootDiv>
    );
}

/**
 * Styled Components
 */

const StyledLabel = styled("div")`
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

const IconButtonWrapper = styled("div")`
    display: flex;
    align-items: center;
`;

export default MovieDetailView;
