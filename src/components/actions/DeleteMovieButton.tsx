import * as React from "react";
import MovieActionButton from "./MovieActionButton";
import DeleteIconOutlined from "@material-ui/icons/DeleteOutlined";

interface DeleteMovieButtonProps  {
    onDelete: () => void;
    label?: string;
}

function DeleteMovieButton(props: DeleteMovieButtonProps) {
    return (
        <MovieActionButton
            tooltip={"Delete Movie"}
            onAction={props.onDelete}
            label={props.label}
        >
            <DeleteIconOutlined fontSize={"default"}/>
        </MovieActionButton>
    );
}

export default DeleteMovieButton;
