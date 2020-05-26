import {IconButton, Tooltip} from "@material-ui/core";
import * as React from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import styled from "styled-components";

interface RateMovieButtonProps  {
    onStartRating: () => void;
    alreadyRated: boolean;
}


function RateMovieButton(props: RateMovieButtonProps) {
    return (
        <Tooltip title={props.alreadyRated ? "Already Rated!" : "Rate Movie"}>
            <IconButtonWrapper>
                <IconButton
                    size={"small"}
                    className={"table-action-button"}
                    onClick={(e) => {e.stopPropagation(); props.onStartRating();}}
                    disabled={props.alreadyRated}
                >
                    <StarBorderIcon fontSize={"default"}/>
                </IconButton>
            </IconButtonWrapper>
        </Tooltip>
    );
}

/**
 * Styled Components
 */
const IconButtonWrapper = styled("div")`
    display: flex;
    align-items: center;
`;

export default RateMovieButton;
