import { styled, Toolbar } from "@mui/material";
import AddToQueue from "@mui/icons-material/AddToQueue";

export const ActionBarContainer = styled("div")(
  ({ theme: { breakpoints, spacing } }) => ({
    flexGrow: 1,

    [breakpoints.down(615)]: {
      marginTop: spacing(3),
    },
  })
);

export const ActionToolbar = styled(Toolbar)(
  ({ theme: { breakpoints, spacing } }) => ({
    marginTop: spacing(2),
    columnGap: spacing(2),
    padding: "0 !important",

    [breakpoints.down(615)]: {
      flexDirection: "column-reverse",
      height: 100,
      marginBottom: spacing(2),
    },
  })
);

export const SecondaryActions = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridAutoFlow: "column",
  columnGap: spacing(2),
}));

export const AddToQueueIcon = styled(AddToQueue)(
  ({ theme: { breakpoints, spacing } }) => ({
    marginRight: spacing(2),

    [breakpoints.down(736)]: {
      marginRight: 0,
    },
  })
);
