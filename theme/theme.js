import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const darkBlue = {
  50: "#b4b5de",
  500: "#37476c",
  900: "#1e1e30",
};

const accent = "cornflowerblue";
const icon = grey[600];

export const theme = createTheme({
  palette: {
    primary: {
      main: darkBlue[500],
    },
    secondary: {
      main: darkBlue[50],
    },
    darkBlue,
    grey,
    accent,
    icon,
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "nav" },
          style: {
            color: darkBlue[50],
            textTransform: "initial",
            fontSize: "1rem",
            fontWeight: 400,
          },
        },
      ],
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
        color: darkBlue[50],
      },
    },
  },
});
