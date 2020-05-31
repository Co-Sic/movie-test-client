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
    const formattedDate = new Date(rating.dateCreated).toLocaleDateString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    return (
        <RootDiv>
            <Header>
                <StyledUsername variant={"body1"}>{rating.user.username}</StyledUsername>
                <RatingWrapper>
                    {ratingsArray.map((val: boolean, index: number) => <Star key={index} variant={val ? "full" : "empty"}/>)}
                </RatingWrapper>
            </Header>
            <StyledDate variant={"body2"}>{formattedDate}</StyledDate>
            <CommentWrapper variant={"body2"}>{rating.comment}</CommentWrapper>
        </RootDiv>
    );
}

/**
 * Styled Components
 */
const RootDiv = styled("div")`
    display: flex;
    flex-direction: column;
    margin-left: 6px;
`;

const Header = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const RatingWrapper = styled("div")`
    margin-left: 6px;
    position: relative;
    top: -1px;
`;

const StyledUsername = styled(Typography)`
    font-weight: 500;
`;

const StyledDate = styled(Typography)`
    color: rgba(0,0,0,0.51);
`;

const CommentWrapper = styled(Typography)`
`;

export default SingleRating;
