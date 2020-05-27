import React, {useState} from "react";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";


interface SearchInputProps {
    text: string,
    setText: (text: string) => void
}

function SearchInput(props: SearchInputProps) {

    // const {text, setText} = props;
    const [focused, setFocused] = useState(false);
    const textFieldRef = React.useRef<HTMLInputElement>(null);

    const clearInputAction = () => {

        props.setText("");
        if (textFieldRef.current != null) {
            textFieldRef.current.focus();
        }
    };

    return (
        <Wrapper isFocused={focused} elevation={focused ? 2 : 0}>
            <SearchIconButton>
                <SearchIcon/>
            </SearchIconButton>
            <StyledInput
                inputRef={textFieldRef}
                placeholder={"Search"}
                value={props.text}
                onChange={event => props.setText(event.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <InvisibleIconButton
                onClick={clearInputAction}
                isHidden={!(props.text.length > 0)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            >
                <ClearIcon/>
            </InvisibleIconButton>
        </Wrapper>
    );
}

/**
 * Styled Components
 */
const Wrapper = styled(({isFocused: boolean, ...rest}) => <Paper {...rest}/>)`
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #f1f3f4;
    padding: 4px;
    border: 1px solid transparent;
    
    ${props => props.isFocused && `
        background-color: white;
        border: 1px solid ${props.theme.palette.border.default};
    `}
    
`;

const SearchIconButton = styled(IconButton)`
    padding: 6px;
    cursor: default;
    background-color: transparent;    
    :hover {
        background-color: transparent;
    }
`;

const StyledInput = styled(InputBase)`
    margin: 0 4px 0 4px;
    flex-grow: 1;
`;

const InvisibleIconButton = styled(({isHidden: boolean, ...rest}) => <IconButton {...rest}/>)`
    padding: 6px;
    ${props => props.isHidden && `
        color: transparent;
        cursor: default;
        background-color: transparent;    
        :hover {
            background-color: transparent;
        }
    `}
`;

export default SearchInput;
