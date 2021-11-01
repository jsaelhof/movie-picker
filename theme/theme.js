import { createTheme, adaptV4Theme } from "@mui/material";

const navColor = "#b4b5de";

export const theme = createTheme(adaptV4Theme({
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
}));
