import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from '@material-ui/icons/StarHalf';
import styled from "styled-components";

interface StarProps {
    variant: ("half" | "full" | "empty");
}

function Star(props: StarProps) {
    const {variant} = props;

    return (
        <RatingCell>
            {variant === "half" && <StarHalfIcon fontSize={"small"} />}
            {variant === "empty" && <StarBorderIcon fontSize={"small"} />}
            {variant === "full" && <StarIcon fontSize={"small"} />}
        </RatingCell>
    );
}

/**
 * Styled Components
 */
const RatingCell = styled("div")`
    display: inline-flex;
    vertical-align: middle;
    > svg {
        color: #ffbb00;
        margin-left: 2px;
        //position:relative;
        //bottom: 2px;
    }
`;

export default Star;
