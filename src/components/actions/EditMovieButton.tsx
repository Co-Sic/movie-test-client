import {IconButton, Tooltip} from "@material-ui/core";
import * as React from "react";
import EditIconOutlined from "@material-ui/icons/EditOutlined";

interface EditMovieButtonProps  {
    onEdit: () => void;
}


function EditMovieButton(props: EditMovieButtonProps) {
    return (
        <Tooltip title={"Edit Movie"}>
            <IconButton
                size={"small"}
                className={"table-action-button"}
                onClick={(e) => {e.stopPropagation(); props.onEdit();}}
            >
                <EditIconOutlined fontSize={"small"}/>
            </IconButton>
        </Tooltip>
    );
}

export default EditMovieButton;
