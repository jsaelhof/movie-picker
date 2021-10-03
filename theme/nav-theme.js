import { createMuiTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const navPrimary = grey[300];

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: navPrimary,
    },
  },

  overrides: {
    MuiSelect: {
      root: {
        color: navPrimary,
      },
      icon: {
        color: navPrimary,
      },
    },
    MuiAppBar: {
      colorTransparent: {
        color: navPrimary,
      },
    },
  },
});
