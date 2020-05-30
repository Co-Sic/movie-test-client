import React, {useState} from "react";
import styled from "styled-components";
import Star from "./Star";


interface RatingWithStarsProps {
    onRate: (value: number) => void;
}

function RatingWithStars(props: RatingWithStarsProps) {


    const ratingsArray = new Array(5).fill(1);
    const [currentValue, setCurrentValue] = useState(0);
    const [baselineValue, setBaselineValue] = useState(0);

    function handleClick(index: number) {
        setCurrentValue(index + 1);
        setBaselineValue(currentValue);
        props.onRate(currentValue);
    }

    return (
        <Root>

            {ratingsArray.map((_ ,index: number) =>
                <StarWrapper
                    key={index}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => setCurrentValue(index + 1)}
                    onMouseLeave={() => setCurrentValue(baselineValue)}
                >
                    <Star variant={(index + 1 <= currentValue) ? "full" : "empty"}/>
                </StarWrapper>
            )}


        </Root>
    );
}

/**
 * Styled Components
 */
const Root = styled("div")`
    display: flex;
    flex-direction: row;
`;
const StarWrapper = styled("div")`
    cursor: pointer;
`;

export default RatingWithStars
