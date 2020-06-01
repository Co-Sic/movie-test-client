import React from "react";
import themes from "./themes";
import { ThemeProvider as MuiThemeProvider, StylesProvider, CssBaseline } from "@material-ui/core";
import {ThemeProvider} from "styled-components";

function withStyles(Component: any) {

    function WithStyles(props: object) {
        return (
            <MuiThemeProvider theme={themes.muiTheme}>
                <StylesProvider injectFirst>
                    <CssBaseline />
                    <ThemeProvider theme={themes.styledComponentsTheme}>
                        <Component {...props}/>
                    </ThemeProvider>
                </StylesProvider>
            </MuiThemeProvider>
        );
    }

    return WithStyles;
}

export default withStyles;
