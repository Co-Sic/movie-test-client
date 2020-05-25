import React from "react";
import {List} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import {GetRatings, Movie} from "../api/types";
import {GET_RATINGS_FOR_MOVIE} from "../api/queries";
import styled from "styled-components";
import SingleRating from "../components/SingleRating";

interface RatingsViewProps {
    movie: Movie
}

function RatingsView(props: RatingsViewProps) {
    const {
        data: ratingsData,
        loading: ratingsLoading,
        error: ratingsError
    } = useQuery<GetRatings>(GET_RATINGS_FOR_MOVIE, {variables: {movieId: props.movie.id}});

    if (ratingsLoading) return <p>Loading</p>;
    if (ratingsError) return <p>ERROR</p>;
    if (!ratingsData) return <p>Not found</p>;
    let ratings = ratingsData.ratingsForMovie;

    return (
        <div>
            <List>
                {ratings.map(rating => <RatingListItem key={rating.id}>
                    <SingleRating rating={rating}/>
                </RatingListItem>)}
            </List>
        </div>
    );
}

const RatingListItem = styled("div")`
    border-top: 1px solid ${p => p.theme.palette.border.default};
    padding: 8px 0 8px 0;
`;

export default RatingsView;



