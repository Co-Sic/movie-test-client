import {createMuiTheme} from "@material-ui/core";

const muiTheme = createMuiTheme({
    palette: {
        background: {
            default: "#fff"
        }
    },
    typography: {
        button: {
            textTransform: "none"
        }
    }
});

const styledComponentsTheme = {
    ...muiTheme,
    palette: {
        ...muiTheme.palette,
        border: {
            default: "rgba(0,0,0,0.12)"
        }
    }
};

const themes = {muiTheme, styledComponentsTheme};

export default themes;
