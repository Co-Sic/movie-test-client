import React from "react";
import styled from "styled-components";
import {IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Movie, Actor, GetAlreadyRated} from "../api/types";
import formatDuration from "../__helper__/formatDuration";
import {useQuery} from "@apollo/react-hooks";
import {GET_MOVIE_ALREADY_RATED} from "../api/queries";
import RatingsView from "./RatingsView";
import DeleteMovieButton from "../components/actions/DeleteMovieButton";
import EditMovieButton from "../components/actions/EditMovieButton";
import RateMovieButton from "../components/actions/RateMovieButton";

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
    if (error) {console.log(error); return <p>ERROR</p>}
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
                    <RateMovieButton onStartRating={props.onStartRating} alreadyRated={alreadyRated} />
                    <EditMovieButton onEdit={() => props.onEditMovie(movie)}/>
                    <DeleteMovieButton onDelete={() => props.onDeleteMovie(movie)} />
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

export default MovieDetailView;
