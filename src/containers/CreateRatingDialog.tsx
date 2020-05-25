import React, {useState} from "react";
import StyledDialog from "../components/StyledDialog";
import RatingWithStars from "../components/RatingWithStars";
import {Movie} from "../api/types";
import {TextField, Typography} from "@material-ui/core";
import {useMutation} from "@apollo/react-hooks";
import {ADD_RATING, GET_MOVIE_ALREADY_RATED, GET_RATINGS_FOR_MOVIE} from "../api/queries";
import styled from "styled-components";

interface CreateRatingDialogProps {
    onDialogClose: () => void,
    movie: Movie,
}

function CreateRatingDialog(props: CreateRatingDialogProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [addRating] = useMutation(ADD_RATING);


    function handleSubmit() {
        addRating({
            variables: {movieId: props.movie.id, value: rating, comment},
            refetchQueries:[{query: GET_RATINGS_FOR_MOVIE, variables: {movieId: props.movie.id}}, {query: GET_MOVIE_ALREADY_RATED, variables: {movieId: props.movie.id}}]
        }).catch(err => console.log(err));
        props.onDialogClose();
    }

    return(
        <StyledDialog
            title={"Rate Movie"}
            onCancel={props.onDialogClose}
            onSave={handleSubmit}
        >
            <ContentWrapper>
                <Typography variant={"body1"}>
                    {"Average Rating"}
                </Typography>
                <RatingWithStars onRate={(r: number) => setRating(r)}/>
                <StyledCommentField
                    label={"Comment"}
                    variant={"outlined"}
                    multiline
                    fullWidth
                    rowsMax={6}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
            </ContentWrapper>


        </StyledDialog>
    );
}

/**
 * Styled Components
 */
const ContentWrapper = styled("div")`
    display: flex;
    flex-direction: column;
`;

const StyledCommentField = styled(TextField)`
    margin-top: 20px;
`;




export default CreateRatingDialog;
