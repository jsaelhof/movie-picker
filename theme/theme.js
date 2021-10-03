import { createMuiTheme } from "@material-ui/core";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

console.log({ breakpoints });

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#37476c",
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
  },
});
