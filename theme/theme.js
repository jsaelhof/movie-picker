import { createMuiTheme } from "@material-ui/core";

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
    },
    MuiAppBar: {
      colorTransparent: {
        color: navColor,
      },
    },
  },
});
