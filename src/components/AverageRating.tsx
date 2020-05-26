import React from "react";
import styled from "styled-components";
import Star from "./Star";

interface AverageRatingProps {
    averageRating: number
}

function AverageRating(props: AverageRatingProps) {
    const { averageRating } = props;
    const ratingsArray = new Array(5).fill(1).map((_, index) => {
        if (index < averageRating - 0.75) {
            return "full";
        } else if (index + 0.25 < averageRating && averageRating < index + 0.75) {
            return "half";

        }
        return "empty";
    });
    return (
        <RootDiv>
            {ratingsArray.map((v, index) => <Star key={index} variant={v}/>)}
        </RootDiv>
    );
}

/**
 * Styled Components
 */
    const RootDiv = styled("div")`
    display: flex;
    flex-direction: row;
`;

export default AverageRating;
