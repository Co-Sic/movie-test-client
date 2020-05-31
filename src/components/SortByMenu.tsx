import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";

interface SortByMenuProps {
    items: { value: number, label: string }[],
    onValueChange: (value: number) => void,
}

function SortByMenu(props: SortByMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value: number) => {
        setAnchorEl(null);
        props.onValueChange(value);
    };

    return (
        <div>
            <Button
                onClick={handleClick}
            >
                <SortIcon/>
                {"Sort by"}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                transformOrigin={{vertical: "top", horizontal: "left"}}
            >
                {props.items.map(item =>
                    <MenuItem
                        key={item.value}
                        onClick={() => handleClose(item.value)}
                    >
                        {item.label}
                    </MenuItem>)}
            </Menu>
        </div>

    );
}

export default SortByMenu;
