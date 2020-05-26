import React from "react";
import styled from "styled-components";
import {Rating} from "../api/types";
import Star from "./Star";
import {Typography} from "@material-ui/core";

interface RatingProps {
    rating: Rating
}

function SingleRating(props: RatingProps) {
    const {rating} = props;
    const ratingsArray = new Array(5).fill(1).map((_, index) => index < rating.value);
    return (
        <RootDiv>
            <Header>
                {ratingsArray.map((val: boolean, index: number) => <Star key={index} variant={val ? "full" : "empty"}/>)}
                <Username variant={"body1"}>{rating.user.username}</Username>
            </Header>
            <RatingWrapper variant={"body2"}>{rating.comment}</RatingWrapper>
        </RootDiv>
    );
}

/**
 * Styled Components
 */
const RootDiv = styled("div")`
display: flex;
flex-direction: column;
`;

const Header = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    > a {
      margin-left: 10px;
    }
`;

const Username = styled(Typography)`
    margin-left: 8px;
`;

const RatingWrapper = styled(Typography)`
    margin-left: 6px;
`;

export default SingleRating;
