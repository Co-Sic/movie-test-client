import * as React from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import MovieActionButton from "./MovieActionButton";

interface RateMovieButtonProps  {
    onStartRating: () => void;
    alreadyRated: boolean;
    label?: string;
}

function RateMovieButton(props: RateMovieButtonProps) {
    return (
        <MovieActionButton
            tooltip={props.alreadyRated ? "Already Rated!" : "Rate Movie"}
            onAction={props.onStartRating}
            label={props.label}
            disabled={props.alreadyRated}
        >
            <StarBorderIcon fontSize={"default"}/>
        </MovieActionButton>
    );
}

export default RateMovieButton;
