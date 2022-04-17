import { styled } from "@mui/material";

export const RatingContainer = styled("div")(({ theme: { spacing } }) => ({
  display: "flex",
  columnGap: spacing(2),
  alignItems: "center",

  "@media (max-width: 660px)": {
    alignItems: "center",
    flexDirection: "column",
    columnGap: "unset",
  },
}));
