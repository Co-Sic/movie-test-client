import * as React from "react";
import EditIconOutlined from "@material-ui/icons/EditOutlined";
import MovieActionButton from "./MovieActionButton";

interface EditMovieButtonProps  {
    onEdit: () => void;
    label?: string;
}


function EditMovieButton(props: EditMovieButtonProps) {
    return (
        <MovieActionButton
            tooltip={"Edit Movie"}
            onAction={props.onEdit}
            label={props.label}
        >
            <EditIconOutlined fontSize={"default"}/>
        </MovieActionButton>
    );
}

export default EditMovieButton;
