import { createMuiTheme } from "@material-ui/core";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

const navColor = "#b4b5de";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#37476c",
    },
    secondary: {
      main: navColor,
    },
  },

  overrides: {
    MuiButton: {
      text: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      root: {
        [breakpoints.down(500)]: {
          display: "initial",
        },
      },
    },
    MuiAppBar: {
      colorTransparent: {
        color: navColor,
      },
    },
  },
});
