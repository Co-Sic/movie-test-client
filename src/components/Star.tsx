import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import styled from "styled-components";

interface StarProps {
    full: boolean;
}

function Star(props: StarProps) {
    const {full} = props;

    return (
        <RatingCell>
            {!full && <StarBorderIcon fontSize={"small"} />}
            {full && <StarIcon fontSize={"small"} />}
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
