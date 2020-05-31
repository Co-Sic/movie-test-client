import React, {useState} from "react";
import {List, Typography} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import {GetRatings, Movie, Rating} from "../api/types";
import {GET_RATINGS_FOR_MOVIE} from "../api/queries";
import styled from "styled-components";
import SingleRating from "../components/SingleRating";
import SortByMenu from "../components/SortByMenu";

interface RatingsViewProps {
    movie: Movie
}

enum SortOrder {
    DATE_DESC,
    RATING_DESC,
    RATING_ASC,
}

function RatingsView(props: RatingsViewProps) {

    const [sortOrder, setSortOrder] = useState(SortOrder.DATE_DESC);

    const {
        data: ratingsData,
        loading: ratingsLoading,
        error: ratingsError
    } = useQuery<GetRatings>(GET_RATINGS_FOR_MOVIE, {variables: {movieId: props.movie.id}});

    if (ratingsLoading) return <p>Loading</p>;
    if (ratingsError) return <p>ERROR</p>;
    if (!ratingsData) return <p>Not found</p>;

    let ratings: Rating[] = ratingsData.ratingsForMovie.sort((r1: Rating, r2: Rating) => {
        if (sortOrder === SortOrder.RATING_DESC || sortOrder === SortOrder.RATING_ASC) {
            return (r2.value - r1.value) * (sortOrder === SortOrder.RATING_ASC ? -1 : 1);
        } else {
            return new Date(r2.dateCreated).getTime() - new Date(r1.dateCreated).getTime();
        }
    });

    return (
        <div>
            <Header>
                <Typography variant={"subtitle1"}>
                    {ratings.length + (ratings.length === 1 ? " Rating" : " Ratings")}
                </Typography>
                <SortByMenu
                    onValueChange={value => setSortOrder(value)}
                    items={[
                        {value: SortOrder.DATE_DESC, label: "Most recent"},
                        {value: SortOrder.RATING_DESC, label: "Best rating"},
                        {value: SortOrder.RATING_ASC, label: "Worst rating"},
                    ]}
                />
            </Header>
            <List>
                {ratings.map(rating => <RatingListItem key={rating.id}>
                    <SingleRating rating={rating}/>
                </RatingListItem>)}
            </List>
        </div>
    );
}

/**
 * Styled Components
 */
const RatingListItem = styled("div")`
    
    padding: 8px 0 8px 0;
`;

const Header = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-top: 1px solid ${p => p.theme.palette.border.default};
    padding-top: 10px;
    align-items: center;
`;

export default RatingsView;



