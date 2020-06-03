import {Button, IconButton, Tooltip, Typography} from "@material-ui/core";
import * as React from "react";
import styled from "styled-components";

interface MovieActionButtonProps {
    onAction: () => void;
    tooltip: string;
    label?: string;
    children?: React.ReactNode;
    disabled?: boolean;
}


function MovieActionButton(props: MovieActionButtonProps) {
    if (props.label) {
        return (
            <Tooltip title={props.tooltip}>
                <IconButtonWrapper>
                    <Button
                        size={"small"}
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onAction();
                        }}
                        disabled={props.disabled}
                        fullWidth
                    >
                        <InlineWrapper>
                            {props.children}
                            <StyledLabel variant={"body2"}>{props.label}</StyledLabel>
                        </InlineWrapper>
                    </Button>
                </IconButtonWrapper>

            </Tooltip>
        );
    } else {
        return (
            <Tooltip title={props.tooltip}>
                <IconButtonWrapper>
                    <IconButton
                        size={"small"}
                        className={"table-action-button"}
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onAction();
                        }}
                        disabled={props.disabled}
                    >
                        {props.children}
                    </IconButton>
                </IconButtonWrapper>

            </Tooltip>
        );
    }


}

/**
 * Styled Components
 */
const IconButtonWrapper = styled("div")`
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const InlineWrapper = styled("span")`
    width: 100%;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: black;
    > svg {
        font-size: 32px;;
    }
`;

const StyledLabel = styled(Typography)`
    font-size: 0.9em;
`;
export default MovieActionButton;
