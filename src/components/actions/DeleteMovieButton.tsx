import {IconButton, Tooltip} from "@material-ui/core";
import * as React from "react";
import DeleteIconOutlined from "@material-ui/icons/DeleteOutlined";

interface DeleteMovieButtonProps  {
    onDelete: () => void;
}


function DeleteMovieButton(props: DeleteMovieButtonProps) {

    return (
        <Tooltip title={"Delete Movie"}>
            <IconButton
                size={"small"}
                className={"table-action-button"}
                onClick={(e) => {e.stopPropagation(); props.onDelete();}}
            >
                <DeleteIconOutlined fontSize={"default"}/>
            </IconButton>
        </Tooltip>
    );
}

export default DeleteMovieButton;
